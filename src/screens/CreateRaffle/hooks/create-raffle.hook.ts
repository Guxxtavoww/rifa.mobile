import { useCallback, useState } from 'react';
import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useMutation } from '@tanstack/react-query';

import { toast } from '@/utils/app.utils';
import { uploadMultipleImagesAsync } from '@/utils/upload-image-async.util';
import { removeDuplicatedItemsFromArray } from '@/utils/remove-duplicated-items-from-array.util';

import { CreateRaffleFormType } from '../types/form.types';
import { createRaffleAPI } from '../api/create-raffle.api';

export function useCreateRaffle() {
  const [photosUrls, setPhotosUrls] = useState<string[]>([]);

  const { mutate: createRaffleMutation, isLoading } = useMutation({
    mutationFn: async (data: CreateRaffleFormType) => {
      const firebaseGeneratedPhotosUrls = await uploadMultipleImagesAsync(
        photosUrls
      );

      return createRaffleAPI({ ...data, photos: firebaseGeneratedPhotosUrls });
    },
  });

  const clearPhotos = useCallback(() => {
    setPhotosUrls([]);
  }, []);

  const removePhoto = useCallback((imageUri: string) => {
    setPhotosUrls((prev) => prev.filter((image) => image !== imageUri));
  }, []);

  const handlePickRafflesPhotos = useCallback(async () => {
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
      allowsEditing: false,
      aspect: [16, 9],
      quality: 1,
      selectionLimit: 10,
      allowsMultipleSelection: true,
    });

    if (result.canceled) return;

    setPhotosUrls((prev) => [
      ...prev,
      ...result.assets.map((asset) => asset.uri),
    ]);
  }, [toast]);

  const handleSubmit = useCallback(
    async (data: CreateRaffleFormType) => {
      if (!photosUrls.length) {
        toast('Insira alguma imagem para sua rifa', {
          status: 'warning',
        });

        return;
      }

      createRaffleMutation(data);
    },
    [createRaffleMutation, photosUrls]
  );

  return {
    handleSubmit,
    removePhoto,
    handlePickRafflesPhotos,
    isLoading,
    hasPhotos: photosUrls.length > 0,
    photosUrls,
    clearPhotos,
  };
}
