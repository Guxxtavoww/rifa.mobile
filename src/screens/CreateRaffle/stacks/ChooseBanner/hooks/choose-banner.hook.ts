import { useCallback, useState } from 'react';

export function useChooseBanner(
  video_uri: string,
  replace: ScreenProps['navigation']['replace']
) {
  const [bannerUri, setBannerUri] = useState<string>();

  const handleNextButtonPress = useCallback(() => {
    replace('create-raffle-form', {
      video_uri,
      main_raffle_photo_uri: bannerUri,
    });
  }, [bannerUri, video_uri]);

  return {
    handleNextButtonPress,
    bannerUri,
  };
}
