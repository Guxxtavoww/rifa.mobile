import 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

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
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="register"
        component={Register}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: () => null,
          headerLeft: () => (
            <Feather
              name="arrow-left"
              color={THEME.colors.light_text_color}
              style={{ marginLeft: 8 }}
              size={25}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}
