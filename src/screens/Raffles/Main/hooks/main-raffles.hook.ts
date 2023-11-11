import { useCallback, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { useRedux } from '@/hooks';

import {
  getMainRafflesAPI,
  getRaffleCategoriesAPI,
} from '../api/main-raffles.api';
import { iMainRaffle } from '../types/responses.types';

export function useMainRaffles(defaultSearchText: string) {
  const [currentCategoryId, setCurrentCategoryId] = useState<number>();
  const [searchQueryText, setSearchQueryText] = useState(defaultSearchText);

  const user_id = useRedux().useAppSelector(
    (state) => state.auth.user_data!.user_id
  );

  const { data: categoriesResonse, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['raffles-categories'],
    queryFn: getRaffleCategoriesAPI,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  const {
    data: mainRafflesResult,
    isLoading: isLoadingMainRaffles,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['get-main-raffles', searchQueryText, currentCategoryId],
    queryFn: ({ pageParam = 1 }) =>
      getMainRafflesAPI(pageParam, searchQueryText, currentCategoryId),
    getNextPageParam: (lastPage) => lastPage.meta.next,
    getPreviousPageParam: (firstPage) => firstPage.meta.prev,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  const navigation = useNavigation();

  const getOwnerWidgetContent = useCallback(
    (ownerData: iMainRaffle['owner']) => {
      if (ownerData.user_id === user_id) return 'Você';

      return ownerData.user_name || ownerData.user_email;
    },
    [user_id]
  );

  const handleSearchRaffle = useCallback((query: string) => {
    setSearchQueryText(query);
  }, []);

  const handleCategoryPress = useCallback((category_id: number | undefined) => {
    setCurrentCategoryId(category_id);
  }, []);

  const handleCreateRaffleButtonPress = useCallback(() => {
    navigation.navigate('create-raffle' as never);
  }, [navigation]);

  const onEndReached = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage]);

  const currentCategoryLabel = useMemo(
    () =>
      currentCategoryId !== undefined
        ? categoriesResonse?.find(
            (category) => category.raffle_category_id === currentCategoryId
          )?.raffle_category_name
        : undefined,
    [currentCategoryId, categoriesResonse]
  );

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
    searchQueryText,
    handleCategoryPress,
    currentCategoryId,
    currentCategoryLabel,
  };
}
