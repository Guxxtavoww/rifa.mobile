import { z } from 'zod';

export const registerFormSchema = z
  .object({
    user_name: z.string({ required_error: 'Insira um nome válido' }).trim(),
    user_email: z
      .string({ required_error: 'Insira um e-mail' })
      .email('Insira um e-mail válido')
      .trim(),
    user_password: z.string({ required_error: 'Senha é obrigatória' }),
    user_password_confirmation: z.string({
      required_error: 'Confirme sua senha',
    }),
  })
  .refine((data) => data.user_password === data.user_password_confirmation, {
    message: 'Senhas não coincidem',
    path: ['user_password_confirmation'],
  });

export type RegisterFormType = z.infer<typeof registerFormSchema>;
