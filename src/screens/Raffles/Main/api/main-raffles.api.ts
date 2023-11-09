import api from '@/api';

import { iCategory } from '../types/responses.types';

export const getRaffleCategoriesAPI = async () =>
  api.get<iCategory[]>('/categories').then((res) => Promise.resolve(res.data));

export const getMainRafflesAPI = async () =>
  api.get('/raffles/main').then((res) => Promise.resolve(res.data));
