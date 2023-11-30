import { useCallback } from 'react';
import { ImageSourcePropType } from 'react-native';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';

import {
  createRaffleCommentAPI,
  getRaffleCommentsAPI,
} from '../api/main-raffles.api';
import { useRedux } from '@/hooks';

export function useRaffleComments(raffle_id: string) {
  const user_photo_url: ImageSourcePropType = useRedux().useAppSelector(
    ({ auth }) =>
      auth.user_data!.user_photo_url
        ? {
            uri: auth.user_data!.user_photo_url,
          }
        : require('@/assets/jpg/no-profile-pic.jpg')
  );

  const { mutateAsync: createRaffleCommentMutation, isLoading } = useMutation({
    mutationKey: ['create-raffle-comment'],
    mutationFn: (text: string) => createRaffleCommentAPI(raffle_id, text),
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

  return {
    createRaffleCommentMutation,
    isLoading: isLoading || isLoadingComments,
    raffleCommentsResult: raffleCommentsResult?.pages,
    hasComments: raffleCommentsResult?.pages[0]?.meta.total !== 0,
    onEndReached,
    isFetchingNextPage,
    user_photo_url,
  };
}
