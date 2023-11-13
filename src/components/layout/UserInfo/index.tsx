import React, { useCallback } from 'react';
import { HStack, Icon, VStack, Avatar, View } from 'native-base';
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
  const { user_photo_url, user_email, user_name } = useRedux().useAppSelector(
    (state) => state.auth.user_data!
  );

  const handleAvatarPress = useCallback(() => {
    drawerProps.navigation.navigate('user-settings');
    drawerProps.navigation.closeDrawer();
  }, [drawerProps]);

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
          onPress={handleAvatarPress}
          style={{
            marginBottom: 5,
          }}
        >
          <Avatar
            source={
              user_photo_url
                ? { uri: user_photo_url }
                : require('../../../assets/jpg/no-profile-pic.jpg')
            }
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
      </VStack>
      <DrawerItemList {...drawerProps} />
      <View flex={1} justifyContent="flex-end" px="4" pb="24" mt="full">
        <TouchableOpacity onPress={() => signOut(true)}>
          <HStack space={1} alignItems="center">
            <Icon
              as={<MaterialIcons name="logout" />}
              color={THEME.colors.dark_text_color}
              size={8}
            />
          </HStack>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UserInfo;
