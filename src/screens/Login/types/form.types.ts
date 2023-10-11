import { z } from 'zod';

export const loginFormSchema = z.object({
  user_email: z
    .string({ required_error: 'Insira um e-mail' })
    .email('Insira um e-mail válido'),
  user_password: z.string({ required_error: 'Senha é obrigatória' }),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;
