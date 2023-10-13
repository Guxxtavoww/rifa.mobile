import { Feather } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { THEME } from '@/styles/theme.styles';
import { Raffles } from '@/screens';

const Drawer = createDrawerNavigator();

function DrawerRoutes() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: THEME.colors.screen_white_background,
        },
        headerTitleAlign: 'center',
        drawerActiveTintColor: THEME.colors.orange_color,
        drawerItemStyle: {
          justifyContent: 'center',
        },
        headerTitleStyle: {
          fontFamily: THEME.fonts.medium,
          fontSize: THEME.fontsSizes.large,
        },
        drawerLabelStyle: {
          fontFamily: THEME.fonts.medium,
          fontSize: THEME.fontsSizes.large - 3,
        },
        drawerStyle: {
          backgroundColor: THEME.colors.screen_white_background,
        },
      }}
    >
      <Drawer.Screen
        name="raffles"
        component={Raffles}
        options={{
          title: 'Rifas',
          drawerIcon: ({ size, color, focused }) => (
            <Feather
              name="dollar-sign"
              color={!focused ? THEME.colors.dark_text_color : color}
              size={size - 2}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerRoutes;
