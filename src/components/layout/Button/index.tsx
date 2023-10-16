import React from 'react';
import { IButtonProps, Button as NBButton } from 'native-base';

import { THEME } from '@/styles/theme.styles';

import Text, { iTextProps } from '../Text';
import { View } from 'react-native';

export type ButtonProps = {
  buttonProps?: IButtonProps & {
    renderIcon?: (color: string) => React.ReactNode;
  };
  textProps: iTextProps;
};

const Button: React.FC<ButtonProps> = ({ buttonProps, textProps }) => (
  <NBButton
    w={buttonProps?.w ?? 'full'}
    h={buttonProps?.h ?? '12'}
    bg={buttonProps?.bg ?? THEME.colors.orange_color}
    // display="inline-flex"
    // flexDirection="row"
    // alignItems="center"
    // justifyContent="center"
    {...buttonProps}
  >
    <View
      style={{
        flexDirection: 'row',
      }}
    >
      {buttonProps?.renderIcon
        ? buttonProps.renderIcon(
            textProps.color || THEME.colors.light_text_color
          )
        : null}
      <Text
        {...textProps}
        style={{ marginLeft: !!buttonProps?.renderIcon ? 8 : undefined }}
      />
    </View>
  </NBButton>
);

export default Button;
