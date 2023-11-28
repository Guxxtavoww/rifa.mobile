import React, { useLayoutEffect, useRef } from 'react';
import { Video, ResizeMode } from 'expo-av';
import { View } from 'react-native';

import { WINDOW_WIDTH } from '@/constants';

interface iRaffleVideoProps {
  uri: Maybe<string>;
}

const RaffleVideo: React.FC<iRaffleVideoProps> = ({ uri }) => {
  const videoRef = useRef<Video>(null);

  useLayoutEffect(() => {
    videoRef.current?.playAsync();
  }, []);

  if (!uri) return null;

  return (
    <View
      style={{
        width: WINDOW_WIDTH - 32,
        height: 290,
        marginBottom: 20,
        borderRadius: 10,
      }}
    >
      <Video
        ref={videoRef}
        useNativeControls={false}
        source={{
          uri,
        }}
        resizeMode={ResizeMode.COVER}
        isLooping
        isMuted
        style={{
          width: WINDOW_WIDTH - 32,
          height: 290,
          zIndex: 10,
          borderRadius: 10,
        }}
      />
    </View>
  );
};

export default RaffleVideo;
