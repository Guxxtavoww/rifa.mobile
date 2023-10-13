import React from 'react';
import { IButtonProps, Button as NBButton } from 'native-base';

import { THEME } from '@/styles/theme.styles';

import Text, { iTextProps } from '../Text';

export type ButtonProps = { buttonProps?: IButtonProps; textProps: iTextProps };

const Button: React.FC<ButtonProps> = ({ buttonProps, textProps }) => (
  <NBButton
    w={buttonProps?.w ?? 'full'}
    h={buttonProps?.h ?? '12'}
    bg={buttonProps?.bg ?? THEME.colors.orange_color}
    {...buttonProps}
  >
    <Text {...textProps} />
  </NBButton>
);

export default Button;
