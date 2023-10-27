import { z } from 'zod';

export const raffleResponseSchema = z.object({
  created_at: z.string(),
  due_date: z.string(),
  owner_id: z.string(),
  photos: z.array(
    z.object({
      photo_url: z.string(),
    })
  ),
  raffle_description: z.string(),
  raffle_id: z.string(),
  raffle_title: z.string(),
});

export type RaffleType = z.infer<typeof raffleResponseSchema>;
