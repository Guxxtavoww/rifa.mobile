import { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getMyRafflesAPI } from '../api/my-raffles.api';

export function useMyRaffles() {
  const navigation = useNavigation();

  const [isShowingRafflesToFinalize, setIsShowingRafflesToFinalize] =
    useState(true);

  const handleShowRafflesToFinalize = useCallback(() => {
    setIsShowingRafflesToFinalize(true);
  }, []);

  const handleShowFinalizedRaffles = useCallback(() => {
    setIsShowingRafflesToFinalize(false);
  }, []);

  const {
    data: myRafflesResult,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['get-my-raffles', isShowingRafflesToFinalize],
    queryFn: ({ pageParam = 1 }) =>
      getMyRafflesAPI(pageParam, isShowingRafflesToFinalize),
    getNextPageParam: (lastPage) => lastPage.meta.next,
    getPreviousPageParam: (firstPage) => firstPage.meta.prev,
    refetchOnMount: true,
    refetchOnReconnect: true,
    retry: isShowingRafflesToFinalize,
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
    isShowingRafflesToFinalize,
    handleShowRafflesToFinalize,
    handleShowFinalizedRaffles,
    handleRafflePress,
    onEndReached,
    myRafflesResult: myRafflesResult?.pages || [],
    isLoading,
    isFetchingNextPage,
    hasData: myRafflesResult?.pages[0]?.meta.total !== 0,
  };
}
