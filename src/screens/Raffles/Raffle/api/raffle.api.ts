import { validateApiCall } from '@/utils/validate-api-call.util';

import { raffleResponseSchema } from '../types/responses.types';

export const getRaffleDetails = async (raffle_id: string) =>
  validateApiCall({
    endpoint: `/raffles/${raffle_id}`,
    zodSchema: raffleResponseSchema,
  });
