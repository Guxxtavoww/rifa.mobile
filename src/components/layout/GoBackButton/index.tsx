import React from 'react';
import { IconButton } from 'native-base';
import { Feather } from '@expo/vector-icons';

import { THEME } from '@/styles/theme.styles';

interface iGoBackButtonProps {
  onPress: () => void;
  iconSize?: number;
  color?: 'white' | 'black';
  removeMarginLeft?: boolean;
}

const GoBackButton: React.FC<iGoBackButtonProps> = ({
  onPress,
  iconSize,
  color = 'white',
  removeMarginLeft,
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
      bg: 'gray.600',
      _ios: {
        _icon: {
          size: '2xl',
        },
      },
    }}
    ml={removeMarginLeft ? '0' : '2'}
  />
);

export default GoBackButton;
