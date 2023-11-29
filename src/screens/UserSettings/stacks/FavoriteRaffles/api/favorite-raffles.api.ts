import api from '@/api';

import { iFavoritesRafflesResult } from '../types/responses.types';

export const getFavoriteRafflesAPI = async (page: number, user_id?: string) =>
  api
    .get<iFavoritesRafflesResult>('/raffles/favorite-raffles', {
      params: {
        page,
        user_id,
      },
    })
    .then((res) => Promise.resolve(res.data));
