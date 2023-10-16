import { useCallback, useState } from 'react';
import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { useRedux } from '@/hooks';
import { useCustomToast } from '@/contexts/CustomToastContext';
import { uploadImageAsync } from '@/utils/upload-image-async.util';

import { updateUserAPI } from '../api/user-settings.api';
import { EditUserFormType } from '../types/form.types';

export function useUserSettings() {
  const { toast } = useCustomToast();
  const { user_email, user_name } = useRedux().useAppSelector(
    (state) => state.auth.user_data!
  );

  const [isLoading, setIsLoading] = useState(false);
  const [userPhotoUri, setUserPhotoUri] = useState<string>();

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
        user_photo_url = await uploadImageAsync(userPhotoUri);
      }

      await updateUserAPI({
        ...data,
        user_photo_url: user_photo_url || undefined,
      })
        .then(() => {
          toast('Usuario Atualizado com sucesso!');
        })
        .catch((err) => {
          toast(err.message, {
            status: 'error',
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [toast, userPhotoUri]
  );

  return {
    handlePickUserImage,
    isLoading,
    user_email,
    user_name,
    handleUpdateUser,
    hasPhoto: !!userPhotoUri,
  };
}
