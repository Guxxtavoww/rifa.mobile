import { z } from 'zod';

export const editUserFormSchema = z.object({
  user_name: z.string().optional().nullable(),
  user_email: z.string().optional().nullable(),
});

export type EditUserFormType = z.infer<typeof editUserFormSchema>;
