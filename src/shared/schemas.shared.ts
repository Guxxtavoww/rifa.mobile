import { z } from 'zod';

export const optionalEmailStringSchema = z
  .string()
  .optional()
  .nullable()
  .refine(
    (value) => {
      if (value) {
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
      }
      return true;
    },
    { message: 'Formato de email inválido' }
  );

export const stringToNumberSchema = z
  .string({ required_error: 'Insira um valor!' })
  .transform((str) => +str)
  .refine((str) => !Number.isNaN(str), { message: 'Insira um número válido' });
