import api from '@/api';

import { iSearchRafflesResponse } from '../types/responses.types';

export const searchRafflesAPI = async (query: string) => {
  return api
    .get<iSearchRafflesResponse>('/raffles/search', {
      params: {
        query,
      },
    })
    .then((res) => Promise.resolve(res.data));
};
