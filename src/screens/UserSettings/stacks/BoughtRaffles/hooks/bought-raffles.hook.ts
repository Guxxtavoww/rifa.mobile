import { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getBoughtRafflesAPI } from '../api/bought-raffles.api';

export function useBoughtRaffles() {
  const navigation = useNavigation();

  const {
    data: boughtRafflesResult,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['get-bought-raffles'],
    queryFn: ({ pageParam = 1 }) => getBoughtRafflesAPI(pageParam),
    getNextPageParam: (lastPage) => lastPage.meta.next,
    getPreviousPageParam: (firstPage) => firstPage.meta.prev,
    refetchOnMount: true,
    refetchOnReconnect: true,
    retry: true,
  });

  const handleRafflePress = useCallback(
    (raffle_id: string) => {
      //@ts-ignore
      navigation.navigate('raffle', { raffle_id });
    },
    [navigation]
  );

  const onEndReached = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage]);

  return {
    boughtRafflesResult: boughtRafflesResult?.pages || [],
    isLoading,
    isFetchingNextPage,
    handleRafflePress,
    onEndReached,
    hasData: boughtRafflesResult?.pages[0]?.meta.total !== 0,
  };
}
