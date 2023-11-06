import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

export function useMainRaffles(push: ScreenProps['navigation']['push']) {
  const navigation = useNavigation();

  const handleSearchRaffle = useCallback(
    (query: string) => {
      push('search-raffles', {
        query,
      });
    },
    [push]
  );

  const handleCreateRaffleButtonPress = useCallback(() => {
    navigation.navigate('create-raffle' as never);
  }, [navigation]);

  return { handleSearchRaffle, handleCreateRaffleButtonPress };
}
