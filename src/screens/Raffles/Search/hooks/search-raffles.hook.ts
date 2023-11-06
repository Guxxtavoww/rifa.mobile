import { useCallback, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { searchRafflesAPI } from '../api/search-raffles.api';

export function useSearchRaffles(defaultSearch?: Maybe<string>) {
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
  };
}
