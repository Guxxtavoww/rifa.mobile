import api from '@/api';

import { iRaffle } from '../types/responses.types';

export const getRaffleDetailsAPI = async (raffle_id: string) =>
  api
    .get<iRaffle>(`/raffles/${raffle_id}`)
    .then((res) => Promise.resolve(res.data));

export const handleRaffleFavoritationAPI = async (
  raffle_id: string,
  isFavorited: boolean
) => {
  return api
    .put(
      `raffles/${isFavorited ? 'unfavorite-raffle' : 'favorite-raffle'}/${raffle_id}`
    )
    .then((res) => Promise.resolve(res.data));
};
