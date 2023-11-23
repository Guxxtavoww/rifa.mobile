import { useCallback, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

import { toast } from '@/utils/app.utils';
import { handlePermission } from '@/screens/helpers/request-permission';

export function useChooseVideo(replace: ScreenProps['navigation']['replace']) {
  const [videoUri, setVideoUri] = useState<string>();

  const handleImportVideo = useCallback(async () => {
    await handlePermission();

    const videoResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsMultipleSelection: false,
      allowsEditing: true,
      quality: 1,
      selectionLimit: 1,
      videoMaxDuration: 60,
      videoQuality: ImagePicker.UIImagePickerControllerQualityType.Medium,
      aspect: [4, 3],
    });

    if (videoResult.canceled) return;

    const chosenVideo = videoResult.assets[0]!;
    const maxSizeInBytes = 175 * 1024 * 1024;

    if (chosenVideo.fileSize && chosenVideo.fileSize > maxSizeInBytes) {
      toast('Tamanho máximo de 175Mb execido!', {
        status: 'warning',
      });

      return;
    }

    setVideoUri(chosenVideo.uri);
  }, []);

  const handleNextButtonPress = useCallback(() => {
    if (!videoUri) return;

    replace('create-raffle-form', {
      video_uri: videoUri,
    });
  }, [videoUri, replace]);

  const handleClearVideoUri = useCallback(() => {
    setVideoUri(undefined);
  }, []);

  return {
    videoUri,
    handleImportVideo,
    handleNextButtonPress,
    handleClearVideoUri,
  };
}
