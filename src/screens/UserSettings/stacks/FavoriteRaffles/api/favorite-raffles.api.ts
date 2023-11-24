import api from '@/api';

import { iFavoriteRafflesResponse } from '../types/responses.types';

export const getFavoriteRafflesAPI = async (page: number, user_id?: string) =>
  api
    .get<iFavoriteRafflesResponse>('/raffles/favorite-raffles', {
      params: {
        page,
        user_id,
      },
    })
    .then((res) => Promise.resolve(res.data));
