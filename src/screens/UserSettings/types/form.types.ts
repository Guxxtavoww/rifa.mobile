import { z } from 'zod';

import { optionalEmailStringSchema } from '@/shared/schemas.shared';

export const editUserFormSchema = z.object({
  user_name: z.string().optional().nullable(),
  user_email: optionalEmailStringSchema,
});

export type EditUserFormType = z.infer<typeof editUserFormSchema>;

export type UpdatePayload = EditUserFormType & { user_photo_url?: string };

export const deleteUserFormSchema = z.object({
  password: z.string({ required_error: 'Senha é obrigatória' }),
});

export type DeleteUserFormType = z.infer<typeof deleteUserFormSchema>;
