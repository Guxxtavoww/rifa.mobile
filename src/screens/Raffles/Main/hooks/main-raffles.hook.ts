import { useCallback } from 'react';

export function useMainRaffles(push: ScreenProps['navigation']['push']) {
  const handleSearchRaffle = useCallback(
    (query: string) => {
      push('search-raffles', {
        query,
      });
    },
    [push]
  );

  const handleCreateRaffleButtonPress = useCallback(() => {
    push('');
  }, []);

  return { handleSearchRaffle, handleCreateRaffleButtonPress };
}
