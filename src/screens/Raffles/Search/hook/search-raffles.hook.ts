import { useInfiniteQuery } from '@tanstack/react-query';

import { searchRafflesAPI } from '../api/search-raffles.api';

export function useSearchRaffles() {
  const { data: searchRafflesResult, isLoading } = useInfiniteQuery({
    queryFn: ({ pageParam = 1 }) => searchRafflesAPI(pageParam),
    queryKey: ['search-raffles'],
  });

  return {
    searchRafflesResult,
    isLoading,
  };
}
