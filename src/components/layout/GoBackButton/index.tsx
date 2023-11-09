import React from 'react';
import { IconButton, IIconButtonProps } from 'native-base';
import { Feather } from '@expo/vector-icons';

import { THEME } from '@/styles/theme.styles';

interface iGoBackButtonProps {
  onPress: () => void;
  iconSize?: number;
  color?: 'white' | 'black';
  removeMarginLeft?: boolean;
}

type Props = Omit<IIconButtonProps, keyof iGoBackButtonProps> &
  iGoBackButtonProps;

const GoBackButton: React.FC<Props> = ({
  onPress,
  iconSize,
  color = 'white',
  removeMarginLeft,
  ...rest
}) => (
  <IconButton
    icon={<Feather name="arrow-left" size={iconSize || 25} />}
    onPress={onPress}
    borderRadius="full"
    _icon={{
      color:
        color === 'white'
          ? THEME.colors.light_text_color
          : THEME.colors.dark_text_color,
      size: 'lg',
    }}
    _pressed={{
      bg: color === 'white' ? 'gray.600' : 'gray.300',
      _ios: {
        _icon: {
          size: '2xl',
        },
      },
    }}
    ml={removeMarginLeft ? '0' : '2'}
    {...rest}
  />
);

export default GoBackButton;
