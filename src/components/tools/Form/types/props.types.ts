import { z } from 'zod';
import { FieldValues } from 'react-hook-form';

import { ButtonProps } from '@/components/layout/Button';

import { iInputProps } from '../components/Input';

export type Input<T> = {
  name: keyof T;
  type: 'text' | 'number' | 'password' | 'email';
} & Omit<iInputProps, 'name' | 'type' | 'themeType'>;

export interface iFormProps<T extends FieldValues> {
  inputs: Input<T>[];
  handleSubmit: (data: T) => void | Promise<void>;
  zodSchema?: z.Schema<T>;
  submitButtonText?: string;
  isLoading?: boolean;
  customAction1?: ButtonProps;
  customAction2?: ButtonProps;
  themeType?: iInputProps['themeType'];
}
