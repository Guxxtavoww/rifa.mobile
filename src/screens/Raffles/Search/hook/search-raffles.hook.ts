import { useMutation } from '@tanstack/react-query';

import { searchRafflesAPI } from '../api/search-raffles.api';

export function useSearchRaffles() {
  const {
    data: searchRafflesResult,
    mutate: searchMutation,
    isLoading,
  } = useMutation({
    mutationFn: async (query: string) => searchRafflesAPI(query),
  });

  return {
    searchRafflesResult,
    searchMutation,
    isLoading,
  };
}
