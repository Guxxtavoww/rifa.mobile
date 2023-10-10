import { FieldValues } from 'react-hook-form';

import { Input } from '../components';
import { Input as InputType } from '../types/props.types';

export function mapInputs<T extends FieldValues>(
  input: InputType<T>,
  index: number
) {
  switch (input.type) {
    case 'number':
    case 'text':
    case 'password':
    case 'email':
      return <Input {...input} key={index} />;
    default:
      return null;
  }
}
