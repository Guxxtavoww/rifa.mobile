import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useRedux } from '@/hooks';

import { getRaffleDetails } from '../api/raffle.api';

export function useRaffle(raffle_id: string) {
  const { data: raffle, isLoading } = useQuery({
    queryKey: ['get-raffle'],
    queryFn: async () => getRaffleDetails(raffle_id),
  });

  const user_id = useRedux().useAppSelector(
    (state) => state.auth.user_data!.user_id
  );

  const [photos_urls, owner_name, owner_photo_url] = useMemo(
    () => [
      raffle?.photos.map((item) => item.photo_url),
      raffle?.owner.user_id === user_id
        ? 'Você'
        : raffle?.owner.user_name || raffle?.owner.user_email,
      raffle?.owner.user_photo_url,
    ],
    [raffle]
  );

  return {
    raffle,
    isLoading,
    photos_urls,
    owner_name,
    owner_photo_url,
  };
}
