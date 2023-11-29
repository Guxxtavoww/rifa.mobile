import api from '@/api';

import { iBoughtRafflesResponse } from '../types/responses.type';

export const getBoughtRafflesAPI = async (page: number) =>
  api
    .get<iBoughtRafflesResponse>('/raffles/bought-raffles', {
      params: {
        page,
      },
    })
    .then((res) => Promise.resolve(res.data));
