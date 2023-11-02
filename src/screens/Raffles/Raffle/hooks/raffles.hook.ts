import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getRaffleDetails } from '../api/raffle.api';

export function useRaffle(raffle_id: string) {
  const { data: raffle, isLoading } = useQuery({
    queryKey: ['get-raffle'],
    queryFn: async () => getRaffleDetails(raffle_id),
  });

  const photos_urls = useMemo(
    () => raffle?.photos.map((item) => item.photo_url),
    [raffle]
  );

  return {
    raffle,
    isLoading,
    photos_urls,
  };
}
