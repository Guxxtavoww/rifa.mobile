import api from '@/api';

import {
  iCategory,
  iMainRafflePaginatedResult,
} from '../types/responses.types';

export const getRaffleCategoriesAPI = async () =>
  api.get<iCategory[]>('/categories').then((res) => Promise.resolve(res.data));

export const getMainRafflesAPI = async (
  page?: number,
  raffleQuery?: string,
  raffleCategoryCode?: number
) =>
  api
    .get<iMainRafflePaginatedResult>('/raffles/main-raffles', {
      params: {
        page,
        query: raffleQuery,
        raffle_category_code: raffleCategoryCode,
      },
    })
    .then((res) => Promise.resolve(res.data));
