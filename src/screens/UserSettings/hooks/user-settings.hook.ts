import { useCallback, useMemo, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useMutation } from '@tanstack/react-query';

import { useRedux } from '@/hooks';
import { handlePermission } from '@/screens/helpers/request-permission';

import { updateUserPhotoAPI } from '../api/user-settings.api';
import { iUserStackWidgetProps } from '../components/UserStackWidget';

export function useUserSettings() {
  const [currentStack, setCurrentStack] =
    useState<iUserStackWidgetProps['widgetType']>('shopping-cart');

  const { user_photo_url } = useRedux().useAppSelector(
    (state) => state.auth.user_data!
  );

  const { mutateAsync: updateUserPhotoMutation, isLoading } = useMutation({
    mutationKey: ['update-user-photo-url'],
    mutationFn: (photoUri: string) => updateUserPhotoAPI(photoUri),
  });

  const avatarSource = useMemo(
    () =>
      user_photo_url
        ? { uri: user_photo_url }
        : require('@/assets/jpg/no-profile-pic.jpg'),
    [user_photo_url]
  );

  const updateUserPhoto = useCallback(async () => {
    await handlePermission();

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      selectionLimit: 1,
    });

    if (result.canceled) return;

    const photoUri = result.assets[0]!.uri;

    await updateUserPhotoMutation(photoUri);
  }, []);

  const handleUserWidgetPress = useCallback(
    (to: 'bought-raffles' | 'my-raffles' | 'settings') => {
      setCurrentStack(
        to === 'bought-raffles'
          ? 'shopping-cart'
          : to === 'settings'
          ? 'settings'
          : 'attach-money'
      );
    },
    [setCurrentStack]
  );

  return {
    avatarSource,
    updateUserPhoto,
    isLoading,
    handleUserWidgetPress,
    currentStack,
  };
}
