import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Feed, Login, Register } from '../screens';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="login" component={Login} />
      <Tab.Screen name="register" component={Register} />
    </Tab.Navigator>
  );
}
