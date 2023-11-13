import React from 'react';
import { Pressable, VStack } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

import { THEME } from '@/styles/theme.styles';

export interface iUserStackWidgetProps {
  widgetType: 'shopping-cart' | 'attach-money' | 'settings';
  currentStack: 'shopping-cart' | 'attach-money' | 'settings';
  onPress?: () => void;
}

const UserStackWidget: React.FC<iUserStackWidgetProps> = ({
  widgetType,
  currentStack,
  onPress,
}) => (
  <VStack alignItems="center" space={1}>
    <Pressable
      alignItems="center"
      justifyContent="center"
      bg="#191928"
      borderWidth="2"
      w="16"
      h="16"
      borderRadius="full"
      borderColor={
        currentStack === widgetType ? THEME.colors.orange_color : '#191928'
      }
      _pressed={{
        borderColor: 'white',
      }}
      p="3"
      onPress={onPress}
    >
      <MaterialIcons name={widgetType} color="#fff" size={35} />
    </Pressable>
  </VStack>
);

export default UserStackWidget;
