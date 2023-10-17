import React from 'react';
import { IButtonProps, Button as NBButton, View } from 'native-base';

import { THEME } from '@/styles/theme.styles';

import Text from '../Text';

export type ButtonProps = Omit<IButtonProps, 'children'> & {
  icon?: JSX.Element;
  content?: string;
  children?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  icon: Icon,
  children,
  content,
  ...buttonProps
}) => (
  <NBButton
    w={buttonProps?.w ?? 'full'}
    h={buttonProps?.h ?? '12'}
    bg={buttonProps?.bg ?? THEME.colors.orange_color}
    alignItems="center"
    justifyContent="center"
    textAlign="center"
    _pressed={{
      backgroundColor: buttonProps._pressed?.backgroundColor || 'orange.900',
      ...buttonProps._pressed,
    }}
    {...buttonProps}
  >
    <View
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      {Icon ? Icon : null}
      {children ? (
        children
      ) : (
        <Text
          content={content || 'Pressione'}
          color={THEME.colors.light_text_color}
          fontWeight="bold"
          style={{
            marginLeft: Icon ? 8 : undefined,
          }}
        />
      )}
    </View>
  </NBButton>
);

export default Button;
