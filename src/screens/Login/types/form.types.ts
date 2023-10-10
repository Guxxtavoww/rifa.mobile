import { z } from 'zod';

export const loginFormSchema = z.object({
  user_email: z
    .string()
    .min(1, 'Não deixe email vazio')
    .email('Insira um email válido'),
  user_password: z.string().min(1, 'Não deixe senha vazia'),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;
