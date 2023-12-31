import api from '@/api';
import { store } from '@/redux/store.redux';

import { iRafflesResponse } from '../../shared/types.shared';

export const getMyRafflesAPI = async (page: number, toFinalize?: boolean) => {
  const user_id = store.getState().auth.user_data!.user_id;

  return api
    .get<iRafflesResponse>(
      `/raffles/${toFinalize ? 'raffles-to-finalize' : 'finalized-raffles'}`,
      {
        params: {
          user_id,
          page,
        },
      }
    )
    .then((res) => Promise.resolve(res.data));
};
