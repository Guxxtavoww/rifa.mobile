import { FieldValues } from 'react-hook-form';

import { Input } from '../components';
import { iInputProps } from '../components/Input';
import { Input as InputType } from '../types/props.types';

export function mapInputs<T extends FieldValues>(
  input: InputType<T>,
  index: number,
  themeType?: iInputProps['themeType']
) {
  switch (input.type) {
    case 'number':
    case 'text':
    case 'password':
    case 'email':
      return <Input {...input} themeType={themeType} key={index} />;
    default:
      return null;
  }
}
