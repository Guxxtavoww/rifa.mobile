import React, { useLayoutEffect, useRef, useState } from 'react';
import { Video, ResizeMode } from 'expo-av';
import { View, StyleSheet } from 'react-native';
import { Pressable } from 'native-base';
import { Feather } from '@expo/vector-icons';

import { raffleVideoStyles } from './styles';

interface iRaffleVideoProps {
  uri: Maybe<string>;
}

const RaffleVideo: React.FC<iRaffleVideoProps> = ({ uri }) => {
  const [videoStatus, setVideoStatus] = useState<{
    androidImplementation: string;
    audioPan: number;
    didJustFinish: boolean;
    durationMillis: number;
    isBuffering: boolean;
    isLoaded: boolean;
    isLooping: boolean;
    isMuted: boolean;
    isPlaying: boolean;
    playableDurationMillis: number;
    positionMillis: number;
    progressUpdateIntervalMillis: number;
    rate: number;
    shouldCorrectPitch: boolean;
    shouldPlay: boolean;
    uri: string;
    volume: number;
  }>();

  const videoRef = useRef<Video>(null);

  useLayoutEffect(() => {
    videoRef.current?.playAsync();
  }, []);

  if (!uri) return null;

  return (
    <View style={raffleVideoStyles.videoContainer}>
      <View style={[raffleVideoStyles.overlay, StyleSheet.absoluteFillObject]}>
        <Pressable
          onPress={() =>
            videoStatus?.isPlaying
              ? videoRef.current?.pauseAsync()
              : videoRef.current?.playAsync()
          }
          borderRadius="full"
          p="2"
          _pressed={{
            bg: 'gray.200',
          }}
        >
          <Feather
            name={videoStatus?.isPlaying ? 'pause' : 'play'}
            color="#D9D9D9"
            size={50}
          />
        </Pressable>
      </View>
      <Video
        ref={videoRef}
        useNativeControls={false}
        source={{
          uri,
        }}
        resizeMode={ResizeMode.COVER}
        // @ts-ignore
        onPlaybackStatusUpdate={setVideoStatus}
        isLooping
        isMuted
        style={raffleVideoStyles.videoStyles}
      />
    </View>
  );
};

export default RaffleVideo;
