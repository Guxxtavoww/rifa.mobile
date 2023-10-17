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
