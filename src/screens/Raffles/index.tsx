import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { GoBackButton } from '@/components';
import { THEME } from '@/styles/theme.styles';

import Raffle from './Raffle';
import SearchRaffles from './Search';

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
      name="search-raffles"
      component={SearchRaffles as any}
      options={{ headerShown: false }}
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
