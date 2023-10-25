import { z } from 'zod';

export const createRaffleFormSchema = z.object({
  raffle_title: z.string({ required_error: 'Título é obrigatório' }),
  raffle_description: z.string({ required_error: 'Descrição é obrigatória' }),
  maximum_people_quantity: z.number({
    required_error: 'Insira a quantidade máxima de pessoas',
  }),
  raffle_subscription_price: z
    .number({ required_error: 'Insira o preço de inscrição da rifa' })
    .positive(),
  due_date: z
    .string({
      required_error: 'Data fim é obrigatória',
    })
    .refine(
      (date) => {
        const datefyedString = new Date(date);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        return datefyedString >= currentDate;
      },
      {
        message: 'Insira uma data válida',
      }
    ),
});

export type CreateRaffleFormType = z.infer<typeof createRaffleFormSchema>;

export interface iCreateRaffleAPIPayload extends CreateRaffleFormType {
  photos: string[];
}
