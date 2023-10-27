import React from 'react';
import { HStack, Icon, VStack, Avatar } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import {
  DrawerContentComponentProps,
  DrawerItemList,
} from '@react-navigation/drawer';

import { useRedux } from '@/hooks';
import { signOut } from '@/utils/app.utils';
import { THEME } from '@/styles/theme.styles';
import { formatToDate } from '@/utils/date.utils';

import Text from '../Text';

interface iUserInfoProps {
  drawerProps: DrawerContentComponentProps;
}

const UserInfo: React.FC<iUserInfoProps> = ({ drawerProps }) => {
  const { user_photo_url, user_email, user_name, created_at, updated_at } =
    useRedux().useAppSelector((state) => state.auth.user_data!);

  return (
    <SafeAreaView>
      <VStack
        w="full"
        h="container"
        px="1"
        py="2"
        borderBottomColor="gray.300"
        borderBottomWidth="1px"
        mb="5"
        alignItems="center"
      >
        <TouchableOpacity
          onPress={() => {
            drawerProps.navigation.navigate('user-settings');
            drawerProps.navigation.closeDrawer();
          }}
          style={{
            marginBottom: 5,
          }}
        >
          <Avatar
            source={{
              uri:
                user_photo_url ||
                'https://i.pinimg.com/564x/13/b4/08/13b408f0ad453542c0d8fa8e62602245.jpg',
            }}
            size="2xl"
          />
        </TouchableOpacity>
        <Text
          content={user_name || user_email}
          color={THEME.colors.dark_text_color}
          fontWeight="medium"
          fontSize="large"
          style={{
            marginBottom: 6,
          }}
        />
        <Text
          content={`Criado em: ${formatToDate(created_at, true)}`}
          color={THEME.colors.subtitle_color}
          fontSize="small"
          fontWeight="regular"
          style={{
            marginBottom: 6,
          }}
        />
        {updated_at ? (
          <Text
            content={`Editado em: ${formatToDate(updated_at, true)}`}
            color={THEME.colors.subtitle_color}
            fontSize="small"
            fontWeight="regular"
          />
        ) : null}
        <TouchableOpacity onPress={() => signOut(true)}>
          <HStack space={1} alignItems="center">
            <Icon
              as={<MaterialIcons name="logout" />}
              color={THEME.colors.dark_text_color}
            />
            <Text
              content="Sair"
              fontWeight="bold"
              fontSize="small"
              color={THEME.colors.dark_text_color}
            />
          </HStack>
        </TouchableOpacity>
      </VStack>
      <DrawerItemList {...drawerProps} />
    </SafeAreaView>
  );
};

export default UserInfo;
