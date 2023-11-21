import { useCallback, useMemo } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

import { useRedux } from '@/hooks';

import {
  getRaffleDetailsAPI,
  handleRaffleFavoritationAPI,
} from '../api/raffle.api';
import { queryClient } from '../../../../../App';

export function useRaffle(raffle_id: string) {
  const { data: raffle, isLoading } = useQuery({
    queryKey: ['get-raffle'],
    queryFn: async () => getRaffleDetailsAPI(raffle_id),
  });

  const { mutateAsync: favoritationMutation, isLoading: isMutating } =
    useMutation({
      mutationKey: ['favorite-mutation'],
      mutationFn: async (data: {
        raffle_id: string;
        isFavorited: boolean;
      }) => handleRaffleFavoritationAPI(data.raffle_id, data.isFavorited),
      onSuccess: () => queryClient.refetchQueries(['get-raffle']),
    });

  const { mutate: buyNamesMutation, isLoading: isLoadingNamesBought } =
    useMutation({
      mutationKey: ['buy-names'],
      mutationFn: async (namesAmount: number) => {
        console.log(namesAmount);

        return namesAmount;
      },
    });

  const user_id = useRedux().useAppSelector(
    (state) => state.auth.user_data!.user_id
  );

  const isRaffleFavorited = useMemo(
    () =>
      raffle?.owner.user_id === user_id
        ? undefined
        : !!raffle?.favorite_raffles?.find(
            (favoriteRaffle) => favoriteRaffle.favorited_by_id === user_id
          ),
    [raffle, user_id]
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

  const handleRaffleFavoritation = useCallback(
    async (isFavorited: boolean | undefined) => {
      await favoritationMutation({
        isFavorited: !!isFavorited,
        raffle_id: raffle!.raffle_id,
      });
    },
    [raffle]
  );

  return {
    raffle,
    isLoading,
    photos_urls,
    owner_name,
    owner_photo_url,
    buyNamesMutation,
    isLoadingNamesBought,
    isRaffleFavorited,
    handleRaffleFavoritation,
    isMutating,
  };
}
