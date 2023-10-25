import { FieldValues } from 'react-hook-form';

import { iInputProps } from '../components/Input';
import { Input as InputType } from '../types/props.types';
import { DateInput, Input, PasswordInput, TextArea } from '../components';

export function mapInputs<T extends FieldValues>(
  input: InputType<T>,
  index: number,
  themeType?: iInputProps['themeType']
) {
  switch (input.type) {
    case 'number':
    case 'text':
    case 'email':
    case 'decimal':
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
    case 'textarea':
      return <TextArea themeType={themeType} key={index} {...input} />;
    default:
      return null;
  }
}
