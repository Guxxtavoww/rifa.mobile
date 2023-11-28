import React, { memo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ChooseVideo, CreateRaffleForm, ChooseBanner } from './stacks';
import { CreateRaffleProvider } from './contexts/create-raffle.context';

const CreateRaffleStack = createStackNavigator();

const CreateRaffle: React.FC = () => (
  <CreateRaffleProvider>
    <CreateRaffleStack.Navigator screenOptions={{ headerShown: false }}>
      <CreateRaffleStack.Screen
        name="choose-video"
        component={ChooseVideo as any}
      />
      <CreateRaffleStack.Screen
        name="choose-banner"
        component={ChooseBanner as any}
      />
      <CreateRaffleStack.Screen
        name="create-raffle-form"
        component={CreateRaffleForm as any}
      />
    </CreateRaffleStack.Navigator>
  </CreateRaffleProvider>
);

export default memo(CreateRaffle);
