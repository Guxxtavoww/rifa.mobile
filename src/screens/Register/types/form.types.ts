import { z } from 'zod';

export const registerFormSchema = z.object({
  user_name: z.string({ required_error: 'Insira um nome válido' }),
  user_email: z
    .string({ required_error: 'Insira um e-mail' })
    .email('Insira um e-mail válido'),
  user_password: z.string({ required_error: 'Senha é obrigatória' }),
});

export type RegisterFormType = z.infer<typeof registerFormSchema>;
