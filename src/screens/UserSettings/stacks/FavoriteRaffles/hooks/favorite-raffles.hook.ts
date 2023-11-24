import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useInfiniteQuery } from '@tanstack/react-query';

import { useRedux } from '@/hooks';

import { getFavoriteRafflesAPI } from '../api/favorite-raffles.api';

export function useFavoriteRaffles(incoming_user_id?: string) {
  const navigation = useNavigation();

  const user_id = useRedux().useAppSelector(
    (state) => incoming_user_id || state.auth.user_data?.user_id
  );

  const {
    data: favoriteRafflesResult,
    isLoading: isLoadingFavoriteRaffles,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['get-favorite-raffles'],
    queryFn: ({ pageParam = 1 }) => getFavoriteRafflesAPI(pageParam, user_id),
    getNextPageParam: (lastPage) => lastPage.meta.next,
    getPreviousPageParam: (firstPage) => firstPage.meta.prev,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  const handleFavoriteRaffleClick = useCallback(
    (raffle_id: string) => {
      // @ts-ignore
      navigation.navigate('raffle', {
        raffle_id,
      });
    },
    [navigation]
  );

  const onEndReached = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage]);

  return {
    handleFavoriteRaffleClick,
    onEndReached,
    favoriteRafflesResult: favoriteRafflesResult?.pages,
    isLoadingFavoriteRaffles,
    isFetchingNextPage,
  };
}
