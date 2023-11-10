import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { THEME } from '@/styles/theme.styles';

import Raffle from './Raffle';
import MainRaffles from './Main';

const Stack = createStackNavigator();

const RafflesStack: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: THEME.colors.screen_white_background,
        shadowColor: 'transparent',
      },
      headerTitle: undefined,
    }}
  >
    <Stack.Screen
      name="main-raffles"
      component={MainRaffles as any}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="raffle"
      component={Raffle as any}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default RafflesStack;
