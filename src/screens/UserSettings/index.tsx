import React from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Form, Text } from '@/components';
import { THEME } from '@/styles/theme.styles';
import { commonStyles } from '@/styles/common.styles';

import { useUserSettings } from './hooks/user-settings.hook';
import { editUserFormSchema } from './types/form.types';

const UserSettings: React.FC = () => {
  const {
    handlePickUserImage,
    isLoading,
    user_email,
    user_name,
    handleUpdateUser,
    hasPhoto,
  } = useUserSettings();

  return (
    <View
      style={[commonStyles.screen_container_light, { alignItems: 'center' }]}
    >
      <Text
        content="Editar Usuário"
        color={THEME.colors.dark_text_color}
        fontSize="extraLarge"
        fontWeight="bold"
        style={{ marginBottom: 10 }}
      />
      <Form
        inputs={[
          {
            name: 'user_email',
            type: 'email',
            defaultValue: user_email,
            placeholder: 'Email',
          },
          {
            name: 'user_name',
            type: 'text',
            defaultValue: user_name,
            placeholder: 'Nome de Usuário',
          },
        ]}
        zodSchema={editUserFormSchema}
        handleSubmit={handleUpdateUser}
        themeType="light"
        customAction1={{
          icon: <Feather name="upload" size={20} color="#fff" />,
          onPress: handlePickUserImage,
          isDisabled: hasPhoto,
          content: 'Importar foto de usuário',
        }}
        isLoading={isLoading}
        submitButtonText="Salvar Alterações"
      />
    </View>
  );
};

export default UserSettings;
