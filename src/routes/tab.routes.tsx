import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { THEME } from '@/styles/theme.styles';

import { Login, Register } from '../screens';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: THEME.colors.orange_color,
        tabBarInactiveBackgroundColor: THEME.colors.screen_dark_background,
        tabBarInactiveTintColor: THEME.colors.light_text_color,
        tabBarActiveTintColor: THEME.colors.dark_text_color,
        tabBarHideOnKeyboard: true,
        tabBarItemStyle: {
          borderTopColor: THEME.colors.screen_dark_background,
          borderTopWidth: 1,
        },
      }}
    >
      <Tab.Screen
        name="login"
        component={Login}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size - 5} />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="register"
        component={Register}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="plus" color={color} size={size - 5} />
          ),
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  );
}
