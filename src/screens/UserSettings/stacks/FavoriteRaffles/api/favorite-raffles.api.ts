import api from '@/api';

import { iRafflesResponse } from '../../shared/types.shared'

export const getFavoriteRafflesAPI = async (page: number, user_id?: string) =>
  api
    .get<iRafflesResponse>('/raffles/favorite-raffles', {
      params: {
        page,
        user_id,
      },
    })
    .then((res) => Promise.resolve(res.data));
