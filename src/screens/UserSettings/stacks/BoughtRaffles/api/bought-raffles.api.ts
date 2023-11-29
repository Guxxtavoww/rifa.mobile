import api from '@/api';

import { iRafflesResponse } from '../../shared/types.shared';

export const getBoughtRafflesAPI = async (page: number) =>
  api
    .get<iRafflesResponse>('/raffles/bought-raffles', {
      params: {
        page,
      },
    })
    .then((res) => Promise.resolve(res.data));
