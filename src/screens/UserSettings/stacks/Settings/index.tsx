import React from 'react';
import { View } from 'native-base';
import { FormProvider } from 'react-hook-form';
import { MaterialIcons } from '@expo/vector-icons';

import { Button } from '@/components';
import { Input } from '@/components/tools/Form/components';

import { useSettings } from './hooks/settings.hook';
import DeleteUserModal from './components/DeleteUserModal';

const Settings: React.FC = () => {
  const {
    isLoading,
    user_email,
    user_name,
    handleUpdateUser,
    handleCloseConfirmationModal,
    isConfirmationModalOpen,
    handleOpenConfirmationModal,
    setWasFormEdited,
    wasFormEdited,
    handleHookFormSubmit,
    methods,
  } = useSettings();

  return (
    <View flex={1} w="full" flexDirection="column">
      <FormProvider {...methods}>
        <Input
          name="user_email"
          type="email"
          placeholder="E-mail"
          defaultValue={user_email}
          onChangeText={() => setWasFormEdited(true)}
          themeType="light"
          flex="0"
        />
        <Input
          name="user_name"
          type="text"
          defaultValue={user_name}
          onChangeText={() => setWasFormEdited(true)}
          autoCapitalize="none"
          themeType="light"
          flex="0"
        />
        <View flex={1} justifyContent="flex-end">
          {wasFormEdited ? (
            <Button
              content="Salvar Alterações"
              borderRadius="full"
              isLoading={isLoading}
              icon={<MaterialIcons name="save" color="#fff" size={18} />}
              onPress={handleHookFormSubmit(handleUpdateUser)}
            />
          ) : null}
          <Button
            w="full"
            content="Deletar Conta"
            icon={<MaterialIcons name="delete" color="#fff" size={18} />}
            bg="red.600"
            borderColor="red.600"
            borderWidth="1"
            isLoading={isLoading}
            justifyContent="center"
            onPress={handleOpenConfirmationModal}
            borderRadius="full"
            mt="3"
            _pressed={{
              backgroundColor: 'red.700',
            }}
          />
        </View>
      </FormProvider>
      {isConfirmationModalOpen ? (
        <DeleteUserModal
          handleClose={handleCloseConfirmationModal}
          isOpen={isConfirmationModalOpen}
        />
      ) : null}
    </View>
  );
};

export default Settings;
