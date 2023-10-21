import { z } from 'zod';

export const createRaffleFormSchema = z.object({
  raffle_title: z.string({ required_error: 'Título é obrigatório' }),
  raffle_description: z.string({ required_error: 'Descrição é obrigatória' }),
  maximum_people_quantity: z.number({
    required_error: 'Insira a quantidade máxima de pessoas',
  }),
  due_date: z.string({
    required_error: 'Data fim é obrigatória',
  }),
});

export type CreateRaffleFormType = z.infer<typeof createRaffleFormSchema>;

export interface iCreateRaffleAPIPayload extends CreateRaffleFormType {
  photos: string[];
}
