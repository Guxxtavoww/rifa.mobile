import { useCallback, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

import { handlePermission } from '@/screens/helpers/request-permission';
import { useCreateRaffle } from '@/screens/CreateRaffle/contexts/create-raffle.context';

export function useChooseBanner(replace: ScreenProps['navigation']['replace']) {
  const { dispatch } = useCreateRaffle();
  const [bannerUri, setBannerUri] = useState<string>();

  const handleChooseRaffleBanner = useCallback(async () => {
    await handlePermission();

    const bannerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [16, 9],
      quality: 1,
      selectionLimit: 1,
      allowsMultipleSelection: false,
    });

    if (bannerResult.canceled || !bannerResult.assets[0]) return;

    setBannerUri(bannerResult.assets[0].uri);
  }, []);

  const handleNextButtonPress = useCallback(() => {
    if (!bannerUri) return;

    dispatch({ type: 'add-main-photo-uri', payload: bannerUri });

    replace('create-raffle-form');
  }, [bannerUri]);

  const onClearBannerUri = useCallback(() => {
    setBannerUri(undefined);
  }, []);

  return {
    handleNextButtonPress,
    bannerUri,
    handleChooseRaffleBanner,
    onClearBannerUri,
  };
}
