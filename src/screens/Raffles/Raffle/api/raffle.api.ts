import api from '@/api';

import { iRaffle } from '../types/responses.types';

export const getRaffleDetails = async (raffle_id: string) =>
  api
    .get<iRaffle>(`/raffles/${raffle_id}`)
    .then((res) => Promise.resolve(res.data));
