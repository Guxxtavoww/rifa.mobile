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
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['search-raffles', searchQuery],
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

  const onEndReached = useCallback(() => {
    if (hasNextPage) {
      console.log('Caiu aqui');
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
    total: searchRafflesResult?.pages[0]?.meta.total,
  };
}
