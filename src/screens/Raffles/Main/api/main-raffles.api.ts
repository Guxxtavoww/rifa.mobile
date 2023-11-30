import api from '@/api';

import {
  iCategory,
  iMainRafflePaginatedResult,
  iRaffleCommentsResponse,
} from '../types/responses.types';

export const getRaffleCategoriesAPI = async () =>
  api.get<iCategory[]>('/categories').then((res) => Promise.resolve(res.data));

export const getMainRafflesAPI = async (
  page?: number,
  raffleQuery?: string,
  raffleCategoryCode?: number
) => {
  return api
    .get<iMainRafflePaginatedResult>('/raffles/main-raffles', {
      params: {
        page,
        query: raffleQuery,
        raffleCategory: raffleCategoryCode,
      },
    })
    .then((res) => Promise.resolve(res.data));
};

export const createRaffleCommentAPI = async (
  raffle_id: string,
  text: string
) => {
  return api
    .post<{
      comment_id: number;
      comment_text: string;
    }>('/raffles/create-comment', {
      raffle_id,
      text,
    })
    .then((res) => Promise.resolve(res.data));
};

export const getRaffleCommentsAPI = async (raffle_id: string, page: number) => {
  return api
    .get<iRaffleCommentsResponse>('/raffles/list-raffle-comments', {
      params: {
        raffle_id,
        page,
      },
    })
    .then((res) => Promise.resolve(res.data));
};
