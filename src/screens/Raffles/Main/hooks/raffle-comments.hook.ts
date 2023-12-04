import { useCallback, useEffect, useState } from 'react';
import { Animated, ImageSourcePropType } from 'react-native';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';

import { useRedux } from '@/hooks';
import { queryClient } from 'App';

import {
  createRaffleCommentAPI,
  getRaffleCommentsAPI,
} from '../api/main-raffles.api';

export function useRaffleComments(raffle_id: string) {
  const [commentText, setCommentText] = useState('');

  const animatedValue = new Animated.Value(0);

  const user_photo_url_redux = useRedux().useAppSelector(
    ({ auth }) => auth.user_data!.user_photo_url
  );

  const handleCommentInputChange = useCallback(
    (text: string) => {
      setCommentText((prev) => (prev.length < 170 ? text : prev));
    },
    [setCommentText]
  );

  const getUserAvatarSource = useCallback(
    (
      user_photo_url?: Maybe<string>,
      isCurrentUser?: boolean
    ): ImageSourcePropType => {
      if (isCurrentUser) {
        return user_photo_url_redux
          ? {
              uri: user_photo_url_redux,
            }
          : require('@/assets/jpg/no-profile-pic.jpg');
      }

      return user_photo_url
        ? {
            uri: user_photo_url,
          }
        : require('@/assets/jpg/no-profile-pic.jpg');
    },
    [user_photo_url_redux]
  );

  const { mutateAsync: createRaffleCommentMutation, isLoading } = useMutation({
    mutationKey: ['create-raffle-comment'],
    mutationFn: (text: string) =>
      createRaffleCommentAPI(raffle_id, text).then(() => setCommentText('')),
    onSuccess: () => queryClient.refetchQueries(['get-raffle-comments']),
  });

  const {
    data: raffleCommentsResult,
    isLoading: isLoadingComments,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['get-raffle-comments'],
    queryFn: ({ pageParam = 1 }) => getRaffleCommentsAPI(raffle_id, pageParam),
    getNextPageParam: (lastPage) => lastPage.meta.next,
    getPreviousPageParam: (firstPage) => firstPage.meta.prev,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  const onEndReached = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage]);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 210,
      useNativeDriver: false,
    }).start();

    setInterval(() => {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 210,
        useNativeDriver: false,
      }).start();
    }, 500);
  }, []);

  return {
    createRaffleCommentMutation,
    isLoading,
    isLoadingComments,
    raffleCommentsResult: raffleCommentsResult?.pages,
    hasComments: raffleCommentsResult?.pages[0]?.meta.total !== 0,
    onEndReached,
    isFetchingNextPage,
    getUserAvatarSource,
    animatedValue,
    commentText,
    handleCommentInputChange,
  };
}
