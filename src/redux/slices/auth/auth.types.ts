import { z } from 'zod';

export const authRequestSchema = z.object({
  user_data: z.object({
    user_id: z.string(),
    user_email: z.string().email(),
    user_name: z.string().nullable(),
    funds: z.number().nullable(),
    created_at: z.string(),
    updated_at: z.string().nullable(),
    user_photo_url: z.string().nullable(),
  }),
  access_token: z.string(),
});

export type AuthResponseType = z.infer<typeof authRequestSchema>;

export type AuthStateType = {
  user_data: AuthResponseType['user_data'] | null;
  access_token: AuthResponseType['access_token'] | null;
  isFetchingUser: boolean;
};
