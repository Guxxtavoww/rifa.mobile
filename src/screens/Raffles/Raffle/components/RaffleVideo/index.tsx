import React, { useLayoutEffect, useRef, useState } from 'react';
import { Video, ResizeMode } from 'expo-av';
import { View, StyleSheet } from 'react-native';
import { Pressable } from 'native-base';
import { Feather } from '@expo/vector-icons';

import { WINDOW_WIDTH } from '@/constants';

interface iRaffleVideoProps {
  uri: Maybe<string>;
}

const VIDEO_WIDTH = WINDOW_WIDTH - 32;

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
    <View
      style={{
        width: VIDEO_WIDTH,
        height: 290,
        marginBottom: 20,
        borderRadius: 10,
        position: 'relative',
      }}
    >
      <View
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 14,
          },
          StyleSheet.absoluteFillObject,
        ]}
      >
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
        style={{
          width: VIDEO_WIDTH,
          height: 290,
          zIndex: 5,
          borderRadius: 14,
        }}
      />
    </View>
  );
};

export default RaffleVideo;
