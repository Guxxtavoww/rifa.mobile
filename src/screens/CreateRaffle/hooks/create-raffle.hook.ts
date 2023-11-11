import { useCallback, useMemo, useState } from 'react';
import { Platform } from 'react-native';
import { useForm } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';

import { toast } from '@/utils/app.utils';
import { uploadMultipleImagesAsync } from '@/utils/upload-image-async.util';

import { createRaffleAPI, getCategoriesAPI } from '../api/create-raffle.api';
import {
  CreateRaffleFormType,
  createRaffleFormSchema,
} from '../types/form.types';

export function useCreateRaffle() {
  const [photosUrls, setPhotosUrls] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<SelectOptions>(
    []
  );

  const navigation = useNavigation();

  const methods = useForm<CreateRaffleFormType>({
    resolver: zodResolver(createRaffleFormSchema),
  });

  const {
    handleSubmit: handleHookFormSubmit,
    reset,
    formState: { errors },
  } = methods;

  const { data: categoriesResponse, isLoading: isLoadingCategories } = useQuery(
    {
      queryFn: getCategoriesAPI,
      queryKey: ['categories-options'],
    }
  );

  const categoriesOptions = useMemo(
    () =>
      !selectedCategories.length
        ? categoriesResponse
        : categoriesResponse?.filter(
            (categoryResponse) =>
              !selectedCategories.find(
                (selectedCategories) =>
                  selectedCategories.value === categoryResponse.value
              )
          ),
    [selectedCategories, categoriesResponse]
  );

  const { mutate: createRaffleMutation, isLoading } = useMutation({
    mutationKey: ['create-raffle'],
    mutationFn: async (
      data: CreateRaffleFormType & { selectedCategories: SelectOptions }
    ) => {
      const firebaseGeneratedPhotosUrls = await uploadMultipleImagesAsync(
        photosUrls
      );

      return createRaffleAPI({
        ...data,
        photos: firebaseGeneratedPhotosUrls,
      }).then((raffle) => {
        reset();
        // @ts-ignore
        navigation.navigate('raffle', {
          raffle_id: raffle.raffle_id,
        });
      });
    },
  });

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

  const handleDeleteCategory = useCallback((category_id: string) => {
    setSelectedCategories((prev) =>
      prev.filter((category) => category.value !== category_id)
    );
  }, []);

  const handleSelectCategory = useCallback(
    (category_id: string) => {
      const foundedCategory = categoriesOptions?.find(
        (category) => category.value === category_id
      );

      if (!foundedCategory) {
        toast('Categoria Inválida', {
          status: 'warning',
        });

        return;
      }

      setSelectedCategories((prev) =>
        [...prev, foundedCategory].sort((a, b) =>
          a.label.localeCompare(b.label)
        )
      );
    },
    [categoriesOptions]
  );

  const handleSubmit = useCallback(
    async (data: CreateRaffleFormType) => {
      if (!photosUrls.length) {
        toast('Insira alguma imagem para sua rifa', {
          status: 'warning',
        });

        return;
      } else if (!selectedCategories.length) {
        toast('Insira alguma categoria', {
          status: 'warning',
        });

        return;
      }

      createRaffleMutation({ ...data, selectedCategories });
    },
    [createRaffleMutation, photosUrls, selectedCategories]
  );

  return {
    removePhoto,
    handlePickRafflesPhotos,
    isLoading: isLoading || isLoadingCategories,
    hasPhotos: photosUrls.length > 0,
    photosUrls,
    categoriesOptions,
    methods,
    handleSelectCategory,
    selectedCategories,
    handleDeleteCategory,
    handleHookFormSubmit,
    handleSubmit,
    hasErrors: !!errors,
  };
}
