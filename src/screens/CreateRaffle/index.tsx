import React, { memo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ChooseVideo, CreateRaffleForm } from './stacks';

const CreateRaffleStack = createStackNavigator();

const CreateRaffle: React.FC = () => (
  <CreateRaffleStack.Navigator screenOptions={{ headerShown: false }}>
    <CreateRaffleStack.Screen
      name="choose-video"
      component={ChooseVideo as any}
    />
    <CreateRaffleStack.Screen
      name="create-raffle-form"
      component={CreateRaffleForm as any}
    />
  </CreateRaffleStack.Navigator>
);

export default memo(CreateRaffle);
