import { useMutation } from '@tanstack/react-query';

import { searchRafflesAPI } from '../api/raffles.api';

export function useRaffles() {
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
