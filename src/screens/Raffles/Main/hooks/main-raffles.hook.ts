import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { useRedux } from '@/hooks';

import {
  getMainRafflesAPI,
  getRaffleCategoriesAPI,
} from '../api/main-raffles.api';
import { iMainRaffle } from '../types/responses.types';

export function useMainRaffles(replace: ScreenProps['navigation']['replace']) {
  const user_id = useRedux().useAppSelector(
    (state) => state.auth.user_data!.user_id
  );

  const { data: categoriesResonse, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['raffles-categories'],
    queryFn: getRaffleCategoriesAPI,
  });

  const {
    data: mainRafflesResult,
    isLoading: isLoadingMainRaffles,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['get-main-raffles'],
    queryFn: ({ pageParam = 1 }) => getMainRafflesAPI(pageParam),
    getNextPageParam: (lastPage) => lastPage.meta.next,
    getPreviousPageParam: (firstPage) => firstPage.meta.prev,
    refetchOnMount: true,
  });

  const navigation = useNavigation();

  const getOwnerWidgetContent = useCallback(
    (ownerData: iMainRaffle['owner']) => {
      if (ownerData.user_id === user_id) return 'Você';

      return ownerData.user_name || ownerData.user_email;
    },
    [user_id]
  );

  const handleSearchRaffle = useCallback(
    (query: string) => {
      replace('search-raffles', {
        query,
      });
    },
    [replace]
  );

  const handleCreateRaffleButtonPress = useCallback(() => {
    navigation.navigate('create-raffle' as never);
  }, [navigation]);

  const onEndReached = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage]);

  return {
    mainRafflesResult: mainRafflesResult?.pages,
    handleSearchRaffle,
    handleCreateRaffleButtonPress,
    categoriesResonse,
    isLoadingCategories,
    onEndReached,
    getOwnerWidgetContent,
    isLoadingMainRaffles,
    isFetchingNextPage,
  };
}
