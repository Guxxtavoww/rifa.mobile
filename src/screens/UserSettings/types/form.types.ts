import { z } from 'zod';

import { optionalEmailStringSchema } from '@/shared/schemas.shared';

export const editUserFormSchema = z.object({
  user_name: z.string().optional().nullable(),
  user_email: optionalEmailStringSchema,
});

export type EditUserFormType = z.infer<typeof editUserFormSchema>;
