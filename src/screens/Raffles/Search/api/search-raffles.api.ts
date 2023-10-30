import api from '@/api';

import { iSearchRafflesResponse } from '../types/responses.types';

export const searchRafflesAPI = async (page: number, query?: string) => {
  const params = {
    query: query || '',
    page: page || 1,
  };

  return api
    .get<iSearchRafflesResponse>('/raffles/search', {
      params,
    })
    .then((res) => Promise.resolve(res.data));
};
