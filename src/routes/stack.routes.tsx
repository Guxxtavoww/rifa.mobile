import { createStackNavigator } from '@react-navigation/stack';

import { GoBackButton } from '@/components';
import { THEME } from '@/styles/theme.styles';

import { Login, Register } from '../screens';

const Stack = createStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: THEME.colors.screen_dark_background,
          shadowColor: 'transparent',
        },
      }}
    >
      <Stack.Screen
        name="login"
        component={Login as any}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="register"
        component={Register}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: undefined,
          headerLeft: () => (
            <GoBackButton onPress={() => navigation.push('login')} />
          ),
        })}
      />
    </Stack.Navigator>
  );
}
