import { View } from 'react-native';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Video, ResizeMode, AVPlaybackStatus, VideoProps } from 'expo-av';

interface iDemoVideoProps extends Omit<VideoProps, 'onPlaybackStatusUpdate'> {
  onVideoStatusUpdate?: (status: Maybe<AVPlaybackStatus>) => void;
  autoPlay?: boolean;
}

const DemoVideo: React.FC<iDemoVideoProps> = ({
  onVideoStatusUpdate,
  autoPlay,
  ...rest
}) => {
  const videoRef = useRef<Video>(null);
  const [videoStatus, setVideoStatus] = useState<AVPlaybackStatus>();

  useLayoutEffect(() => {
    if (autoPlay) {
      videoRef.current?.playAsync();
    } else {
      videoRef.current?.stopAsync();
    }
  }, [autoPlay]);

  useEffect(() => {
    if (onVideoStatusUpdate) {
      onVideoStatusUpdate(videoStatus);
    }
  }, [onVideoStatusUpdate, videoStatus]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <Video
        ref={videoRef}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={setVideoStatus}
        {...rest}
      />
    </View>
  );
};

export default DemoVideo;
