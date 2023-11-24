import React, { useEffect } from 'react';
import { Animated } from 'react-native';
import { Pressable } from 'native-base';

import { Text } from '@/components';
import { THEME } from '@/styles/theme.styles';

export interface iUserStackWidgetProps {
  widgetType: 'Comprados' | 'Suas Rifas' | 'Favoritos' | 'Perfil';
  currentStack: 'Comprados' | 'Suas Rifas' | 'Favoritos' | 'Perfil';
  onPress?: () => void;
}

const UserStackWidget: React.FC<iUserStackWidgetProps> = ({
  widgetType,
  currentStack,
  onPress,
}) => {
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    if (currentStack === widgetType) {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();

      return;
    }

    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [currentStack, widgetType, animatedValue]);

  return (
    <Pressable
      _pressed={{
        borderColor: 'white',
      }}
      py="3"
      onPress={onPress}
      position="relative"
      w="container"
    >
      <Text
        content={widgetType}
        fontSize="small"
        color={
          THEME.colors[
            widgetType === currentStack ? 'orange_color' : 'dark_text_color'
          ]
        }
        fontWeight="bold"
        style={{ textAlign: 'center' }}
      />
      {currentStack === widgetType ? (
        <Animated.View
          style={{
            width: '100%',
            height: 2,
            backgroundColor: THEME.colors.orange_color,
            position: 'absolute',
            bottom: 5,
            left: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: ['50%', '0%'],
            }),
          }}
        />
      ) : null}
    </Pressable>
  );
};

export default UserStackWidget;
