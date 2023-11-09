import { useCallback, useMemo } from 'react';
import { useQueries } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';

import { getRaffleCategoriesAPI } from '../api/main-raffles.api';

export function useMainRaffles(replace: ScreenProps['navigation']['replace']) {
  const screenDataResults = useQueries({
    queries: [
      { queryKey: ['raffles-categories', 1], queryFn: getRaffleCategoriesAPI },
    ],
  });

  const navigation = useNavigation();
  const [{ categoriesResonse, isLoadingCategories }] = useMemo(
    () => [
      {
        categoriesResonse: screenDataResults[0].data,
        isLoadingCategories: screenDataResults[0].isLoading,
      },
    ],
    [screenDataResults]
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

  return {
    handleSearchRaffle,
    handleCreateRaffleButtonPress,
    categoriesResonse,
    isLoadingCategories,
  };
}
