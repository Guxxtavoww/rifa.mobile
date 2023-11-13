import React from 'react';
import { HStack } from 'native-base';
import { KeyboardAvoidingView, Platform } from 'react-native';

import { commonStyles } from '@/styles/common.styles';

import UserSettingsStacks from './stacks';
import UserAvatar from './components/UserAvatar';
import UserStackWidget from './components/UserStackWidget';
import { useUserSettings } from './hooks/user-settings.hook';

const UserSettings: React.FC = () => {
  const {
    avatarSource,
    updateUserPhoto,
    isLoading,
    currentStack,
    handleUserWidgetPress,
  } = useUserSettings();

  return (
    <KeyboardAvoidingView
      style={[
        commonStyles.screen_container_light,
        {
          alignItems: 'center',
        },
      ]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <UserAvatar
        avatarSource={avatarSource}
        isLoading={isLoading}
        updateUserPhoto={updateUserPhoto}
      />
      <HStack
        alignItems="center"
        justifyContent="space-between"
        space={3}
        w="full"
        mb="4"
      >
        <UserStackWidget
          widgetType="shopping-cart"
          currentStack={currentStack}
          onPress={() => handleUserWidgetPress('bought-raffles')}
        />
        <UserStackWidget
          widgetType="attach-money"
          currentStack={currentStack}
          onPress={() => handleUserWidgetPress('my-raffles')}
        />
        <UserStackWidget
          widgetType="settings"
          currentStack={currentStack}
          onPress={() => handleUserWidgetPress('settings')}
        />
      </HStack>
      <UserSettingsStacks currentStack={currentStack} />
    </KeyboardAvoidingView>
  );
};

export default UserSettings;
