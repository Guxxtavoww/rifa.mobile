import 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { IconButton } from 'native-base';
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
          headerTitle: undefined,
          headerLeft: () => (
            <IconButton
              icon={<Feather name="arrow-left" size={25} />}
              onPress={navigation.goBack}
              borderRadius="full"
              _icon={{
                color: THEME.colors.light_text_color,
                size: 'lg',
              }}
              _pressed={{
                bg: 'gray.600',
                _ios: {
                  _icon: {
                    size: '2xl',
                  },
                },
              }}
              ml="2"
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}
