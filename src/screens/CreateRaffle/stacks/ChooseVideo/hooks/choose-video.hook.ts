import { useCallback, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

import { toast } from '@/utils/app.utils';
import { handlePermission } from '@/screens/helpers/request-permission';
import { useCreateRaffle } from '@/screens/CreateRaffle/contexts/create-raffle.context';

export function useChooseVideo(replace: ScreenProps['navigation']['replace']) {
  const { dispatch } = useCreateRaffle();
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

      if (
        (chosenVideo.fileSize && chosenVideo.fileSize > maxSizeInBytes) ||
        (chosenVideo.duration && chosenVideo.duration > 60000)
      ) {
        toast('Tamanho do vídeo inválido', {
          status: 'warning',
        });

        return;
      }

      setVideoUri(chosenVideo.uri);
    } catch (error) {
      console.error('Error during video import:', error);
      toast('Um erro ocorreu: ' + error, {
        status: 'warning',
      });
    }
  }, []);

  const handleNextButtonPress = useCallback(() => {
    if (!videoUri) return;

    dispatch({ type: 'add-video-uri', payload: videoUri });

    replace('choose-banner');
  }, [videoUri, replace, dispatch]);

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
