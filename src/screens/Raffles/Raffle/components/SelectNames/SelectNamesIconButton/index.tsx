import React from 'react';
import { IconButton } from 'native-base';
import { Feather } from '@expo/vector-icons';

import { THEME } from '@/styles/theme.styles';

interface iSelectNamesIconButtonProps {
  onPress: () => void;
  icon: 'add' | 'subtract';
}

const SelectNamesIconButton: React.FC<iSelectNamesIconButtonProps> = ({
  onPress,
  icon,
}) => (
  <IconButton
    w="12"
    h="12"
    borderRadius="full"
    justifyContent="center"
    alignItems="center"
    icon={
      <Feather
        name={icon === 'add' ? 'plus' : 'minus'}
        color={THEME.colors.secondary_dark_text_color}
        size={20}
      />
    }
    onPress={onPress}
    backgroundColor={THEME.colors.grayColor}
    _pressed={{
      backgroundColor: 'gray.500',
    }}
  />
);

export default SelectNamesIconButton;
