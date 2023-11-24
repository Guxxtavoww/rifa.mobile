import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';

import { toast } from '@/utils/app.utils';
import { handlePermission } from '@/screens/helpers/request-permission';

import {
  createRaffleAPI,
  getCategoriesAPI,
} from '../api/create-raffle-form.api';
import {
  CreateRaffleFormType,
  createRaffleFormSchema,
  iCreateRaffleAPIPayload,
} from '../types/form.types';

export function useCreateRaffleForm(
  video_uri: string,
  banner_uri: string,
  replace: ScreenProps['navigation']['replace']
) {
  const [photosUrls, setPhotosUrls] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<SelectOptions>(
    []
  );

  const navigation = useNavigation();

  const methods = useForm<CreateRaffleFormType>({
    resolver: zodResolver(createRaffleFormSchema),
  });

  const { handleSubmit: handleHookFormSubmit, reset } = methods;

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
    mutationFn: async (data: iCreateRaffleAPIPayload) => {
      return createRaffleAPI(data, photosUrls, video_uri, banner_uri).then(
        (raffle) => {
          reset();
          setSelectedCategories([]);
          // @ts-ignore
          navigation.navigate('raffle', {
            raffle_id: raffle.raffle_id,
          });
        }
      );
    },
  });

  const removePhoto = useCallback((imageUri: string) => {
    setPhotosUrls((prev) => prev.filter((image) => image !== imageUri));
  }, []);

  const handlePickRafflesPhotos = useCallback(async () => {
    await handlePermission();

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
      ...new Set([...prev, ...result.assets.map((asset) => asset.uri)]),
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

      createRaffleMutation({
        ...data,
        selectedCategories,
      });
    },
    [createRaffleMutation, photosUrls, selectedCategories]
  );

  useEffect(() => {
    if (!video_uri) {
      replace('choose-video');
    }
  }, [video_uri, replace]);

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
  };
}
