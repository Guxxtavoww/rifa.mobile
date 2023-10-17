import { useCallback, useState } from 'react';
import { Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useMutation } from '@tanstack/react-query';

import { useRedux } from '@/hooks';
import { useCustomToast } from '@/contexts/CustomToastContext';
import { uploadImageAsync } from '@/utils/upload-image-async.util';

import { deleteUserAPI, updateUserAPI } from '../api/user-settings.api';
import { EditUserFormType, UpdatePayload } from '../types/form.types';

export function useUserSettings() {
  const { toast } = useCustomToast();
  const { user_email, user_name } = useRedux().useAppSelector(
    (state) => state.auth.user_data!
  );

  const [isLoading, setIsLoading] = useState(false);
  const [userPhotoUri, setUserPhotoUri] = useState<string>();

  const clearUserPhotoUri = useCallback(() => {
    setUserPhotoUri(undefined);
  }, [setUserPhotoUri]);

  const mutation = useMutation({
    mutationFn: (userPayload: UpdatePayload) =>
      updateUserAPI(userPayload, toast)
        .then(clearUserPhotoUri)
        .finally(() => setIsLoading(false)),
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      return deleteUserAPI(toast).finally(() => setIsLoading(false));
    },
  });

  const handlePickUserImage = useCallback(async () => {
    if (Platform.OS !== 'web') {
      const status = (await ImagePicker.requestMediaLibraryPermissionsAsync())
        .status;

      if (status !== 'granted') {
        toast('Por favor dê permissão para o aplicativo', {
          status: 'warning',
        });

        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      selectionLimit: 1,
    });

    if (result.canceled) return;

    setUserPhotoUri(result.assets[0]!.uri);
  }, [toast]);

  const handleUpdateUser = useCallback(
    async (data: EditUserFormType) => {
      setIsLoading(true);

      let user_photo_url: string = '';

      if (userPhotoUri) {
        user_photo_url = await uploadImageAsync(userPhotoUri).catch(() => {
          toast('Falha ao enviar a foto', {
            status: 'error',
          });

          return Promise.reject();
        });
      }

      mutation.mutate({ ...data, user_photo_url });
    },
    [toast, userPhotoUri, clearUserPhotoUri]
  );

  const handleDeleteUser = useCallback(async () => {
    Alert.alert('Desaja deletar seu usuário ?', 'Confirme abaixo', [
      {
        text: 'Cancelar',
      },
      {
        text: 'Confirmar',
        onPress: () => {
          deleteMutation.mutate();
        },
      },
    ]);
  }, []);

  return {
    handlePickUserImage,
    isLoading,
    user_email,
    user_name,
    handleUpdateUser,
    hasPhoto: !!userPhotoUri,
    clearUserPhotoUri,
    handleDeleteUser,
  };
}
