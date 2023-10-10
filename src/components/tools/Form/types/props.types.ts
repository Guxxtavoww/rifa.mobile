import { z } from 'zod';
import { FieldValues } from 'react-hook-form';

import { iInputProps } from '../components/Input';

export type Input<T> = {
  name: keyof T;
  type: 'text' | 'number' | 'password';
} & Omit<iInputProps, 'name' | 'type'>;

export interface iFormProps<T extends FieldValues> {
  inputs: Input<T>[];
  handleSubmit: (data: T) => void | Promise<void>;
  zodSchema?: z.Schema<T>;
  submitButtonText?: string;
  isLoading?: boolean;
}
