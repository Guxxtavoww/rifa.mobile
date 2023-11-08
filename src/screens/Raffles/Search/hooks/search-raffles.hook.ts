import { useCallback, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { useRedux } from '@/hooks';

import { iRaffle } from '../types/responses.types';
import { searchRafflesAPI } from '../api/search-raffles.api';

export function useSearchRaffles(defaultSearch?: Maybe<string>) {
  const user_id = useRedux().useAppSelector(
    (state) => state.auth.user_data!.user_id
  );

  const [searchQuery, setSearchQuery] = useState<string>(defaultSearch || '');

  const {
    data: searchRafflesResult,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['search-raffles', searchQuery],
    queryFn: ({ pageParam = 1 }) => searchRafflesAPI(pageParam, searchQuery),
    getNextPageParam: (lastPage) => lastPage.meta.next,
    getPreviousPageParam: (firstPage) => firstPage.meta.prev,
    refetchOnMount: true,
  });

  const getOwnerWidgetContent = useCallback(
    (ownerData: iRaffle['owner']) => {
      if (ownerData.user_id === user_id) return 'Você';

      return ownerData.user_name || ownerData.user_email;
    },
    [user_id]
  );

  const handleSearchQuery = useCallback(
    (text: string) => {
      setSearchQuery(text);
    },
    [setSearchQuery]
  );

  const onEndReached = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage]);

  return {
    searchRafflesResult: searchRafflesResult?.pages,
    isLoading,
    isFetchingNextPage,
    handleSearchQuery,
    onEndReached,
    searchQuery,
    total: searchRafflesResult?.pages[0]?.meta.total ?? 0,
    getOwnerWidgetContent,
  };
}
