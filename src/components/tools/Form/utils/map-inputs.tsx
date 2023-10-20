import { FieldValues } from 'react-hook-form';

import { iInputProps } from '../components/Input';
import { Input as InputType } from '../types/props.types';
import { DateInput, Input, PasswordInput } from '../components';

export function mapInputs<T extends FieldValues>(
  input: InputType<T>,
  index: number,
  themeType?: iInputProps['themeType']
) {
  switch (input.type) {
    case 'number':
    case 'text':
    case 'email':
      return <Input {...input} themeType={themeType} key={index} />;
    case 'password':
      return (
        <PasswordInput
          {...input}
          type="password"
          themeType={themeType}
          key={index}
        />
      );
    case 'date':
      return <DateInput {...input} key={index} />;
    default:
      return null;
  }
}
