import { KeyboardTypeOptions } from 'react-native';

import { iInputProps } from '.';

export const handleKeyboardType = (
  type: iInputProps['type'] = 'text'
): KeyboardTypeOptions => {
  switch (type) {
    case 'email':
      return 'email-address';
    case 'number':
      return 'numeric';
    case 'password':
    case 'text':
      return 'default';
    case 'decimal':
      return 'decimal-pad';
  }
};
