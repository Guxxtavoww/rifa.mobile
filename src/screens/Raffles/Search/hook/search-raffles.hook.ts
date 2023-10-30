import { useInfiniteQuery } from '@tanstack/react-query';

import { searchRafflesAPI } from '../api/search-raffles.api';
import { useCallback, useState } from 'react';

export function useSearchRaffles() {
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: searchRafflesResult,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['search-raffles'],
    queryFn: ({ pageParam = 1 }) => searchRafflesAPI(pageParam, searchQuery),
    getNextPageParam: (lastPage) => lastPage.meta.next,
    getPreviousPageParam: (firstPage) => firstPage.meta.prev,
  });

  const handleSearchQuery = useCallback(
    (text: string) => {
      setSearchQuery(text);
    },
    [setSearchQuery]
  );

  return {
    searchRafflesResult: searchRafflesResult?.pages[0]?.data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    handleSearchQuery,
  };
}
