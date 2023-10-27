import { IconButton, HStack, Image } from 'native-base';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { UserInfo, Text } from '@/components';
import { THEME } from '@/styles/theme.styles';
import { RafflesStack, UserSettings, CreateRaffle } from '@/screens';

const Drawer = createDrawerNavigator();

function DrawerRoutes() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <UserInfo drawerProps={props} />}
      screenOptions={(navigation) => ({
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
        headerTitle: () => (
          <HStack
            h="full"
            w="container"
            space={2}
            alignItems="center"
            justifyContent="center"
          >
            <Image
              defaultSource={require('../assets/png/Logo.png')}
              source={require('../assets/png/Logo.png')}
              w="9"
              h="8"
              alt="Logo"
            />
            <Text
              content="RifaMaster"
              fontWeight="extraBold"
              fontSize="normalLarge"
              color={THEME.colors.header_logo_color}
            />
          </HStack>
        ),
        headerLeft: () => (
          <IconButton
            icon={<MaterialIcons name="menu" size={25} />}
            onPress={navigation.navigation.toggleDrawer}
            borderRadius="full"
            _icon={{
              color: THEME.colors.dark_text_color,
              size: '6xl',
            }}
            _pressed={{
              bg: 'gray.200',
              _ios: {
                _icon: {
                  size: '2xl',
                },
              },
            }}
            ml="2"
            alignItems="center"
            justifyContent="center"
          />
        ),
      })}
    >
      <Drawer.Screen
        name="raffles"
        component={RafflesStack}
        options={{
          drawerLabel: 'Rifas',
          drawerIcon: ({ size, color, focused }) => (
            <Feather
              name="dollar-sign"
              color={!focused ? THEME.colors.dark_text_color : color}
              size={size - 2}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="create-raffle"
        component={CreateRaffle}
        options={{
          drawerLabel: 'Crie Sua Rifa',
          drawerIcon: ({ size, color, focused }) => (
            <Feather
              name="plus-circle"
              color={!focused ? THEME.colors.dark_text_color : color}
              size={size - 2}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="user-settings"
        component={UserSettings}
        options={{
          drawerLabel: 'Configurações',
          drawerIcon: ({ size, color, focused }) => (
            <Feather
              name="settings"
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
