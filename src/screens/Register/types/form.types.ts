import { z } from 'zod';

export const registerFormSchema = z.object({
  name: z.string().min(1, 'Insira um nome válido'),
  user_email: z
    .string()
    .min(1, 'Não deixe e-mail vazio')
    .email('Insira um e-mail válido'),
  user_password: z.string().min(1, 'Senha é obrigatória'),
});

export type RegisterFormType = z.infer<typeof registerFormSchema>
