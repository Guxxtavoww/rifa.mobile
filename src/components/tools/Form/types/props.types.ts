import { z } from 'zod';
import { FieldValues } from 'react-hook-form';

import { ButtonProps } from '@/components/layout/Button';

import { iInputProps } from '../components/Input';
import { iTextAreaProps } from '../components/TextArea';
import { iDateInputProps } from '../components/DateInput';
import { iPasswordInputProps } from '../components/PasswordInput';

export type Input<T> =
  | ({
      name: keyof T;
      type: 'text' | 'number' | 'email' | 'decimal';
    } & Omit<iInputProps, 'name' | 'type' | 'themeType'>)
  | ({
      name: keyof T;
      type: 'password';
    } & Omit<iPasswordInputProps, 'name' | 'type' | 'themeType'>)
  | ({
      name: keyof T;
      type: 'date';
    } & Omit<iDateInputProps, 'name' | 'type'>)
  | ({
      name: keyof T;
      type: 'textarea';
    } & Omit<iTextAreaProps, 'name' | 'type'>);

export interface iFormProps<T extends FieldValues> {
  inputs: Input<T>[];
  handleSubmit: (data: T) => void | Promise<void>;
  zodSchema?: z.Schema<T>;
  submitButtonText?: string;
  isLoading?: boolean;
  customAction1?: Omit<ButtonProps, 'isLoading'>;
  customAction2?: Omit<ButtonProps, 'isLoading'>;
  themeType?: iInputProps['themeType'];
  hideSubmitButton?: boolean;
}
