import React from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { View as NBView } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

import { Button, Form, Text } from '@/components';
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
    clearUserPhotoUri,
    handleDeleteUser,
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
          icon: (
            <Feather
              name={!hasPhoto ? 'upload' : 'check'}
              size={20}
              color="#fff"
            />
          ),
          onPress: handlePickUserImage,
          isDisabled: hasPhoto,
          content: !hasPhoto
            ? 'Importar foto de usuário'
            : 'Foto Importada com sucesso',
        }}
        customAction2={
          hasPhoto
            ? {
                icon: <Feather name="trash" size={20} color="#fff" />,
                content: 'Limpar Foto',
                onPress: clearUserPhotoUri,
              }
            : undefined
        }
        isLoading={isLoading}
        submitButtonText="Salvar Alterações"
      />
      <NBView
        h="container"
        flex="1"
        pb={1}
        w="full"
        justifyContent="flex-end"
        pt="5"
      >
        <Button
          content="Deletar Conta"
          icon={<MaterialIcons name="delete-forever" color="#fff" size={18} />}
          bg="red.600"
          borderColor="red.600"
          borderWidth="1"
          isLoading={isLoading}
          onPress={handleDeleteUser}
          _pressed={{
            backgroundColor: 'red.700',
          }}
        />
      </NBView>
    </View>
  );
};

export default UserSettings;
