import { useCallback, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

import { toast } from '@/utils/app.utils';
import { handlePermission } from '@/screens/helpers/request-permission';

export function useChooseVideo(replace: ScreenProps['navigation']['replace']) {
  const [videoUri, setVideoUri] = useState<string>();

  const handleImportVideo = useCallback(async () => {
    try {
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

      if (!chosenVideo.fileSize || !chosenVideo.duration)
        throw 'Erro! tente novamente';

      if (chosenVideo.fileSize > maxSizeInBytes || chosenVideo.duration > 60) {
        const message =
          chosenVideo.fileSize > maxSizeInBytes
            ? 'Tamanho máximo de 175Mb excedido!'
            : 'Tamanho máximo do vídeo excedido';

        toast(message, {
          status: 'warning',
        });

        return;
      }

      setVideoUri(chosenVideo.uri);
    } catch (error) {
      console.error('Error during video import:', error);
      toast('An error occurred while importing the video', {
        status: 'error',
      });
    }
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
