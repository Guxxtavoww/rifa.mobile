import api from '@/api';
import { toast } from '@/utils/app.utils';

import { iCreateRaffleAPIPayload } from '../types/form.types';

export const createRaffleAPI = async (data: iCreateRaffleAPIPayload) => {
  return api.post('/raffles', data).then(({ data }) => {
    toast('Rifa Criada com sucesso');

    return Promise.resolve(data);
  });
};
