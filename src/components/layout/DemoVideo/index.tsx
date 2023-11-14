import { View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Video, ResizeMode, AVPlaybackStatus, VideoProps } from 'expo-av';

interface iDemoVideoProps extends Omit<VideoProps, 'onPlaybackStatusUpdate'> {
  onVideoStatusUpdate?: (status: Maybe<AVPlaybackStatus>) => void;
}

const DemoVideo: React.FC<iDemoVideoProps> = ({
  onVideoStatusUpdate,
  ...rest
}) => {
  const videoRef = useRef<Video>(null);
  const [videoStatus, setVideoStatus] = useState<AVPlaybackStatus>();

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
        position: 'relative'
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
