import React, { useCallback, useRef, useState } from 'react';
import { View, VStack, Pressable, HStack, Avatar } from 'native-base';
import { Feather } from '@expo/vector-icons';
import { ResizeMode, Video } from 'expo-av';

import { Text } from '@/components';
import { WINDOW_WIDTH } from '@/constants';
import { THEME } from '@/styles/theme.styles';

import { iMainRaffle } from '../../types/responses.types';
import RaffleComments from './RaffleComments';

interface iRaffleWidgetProps {
  data: iMainRaffle;
  currentSearch?: Maybe<string>;
  push: ScreenProps['navigation']['push'];
  getOwnerWidgetContent: (ownerData: iMainRaffle['owner']) => string;
}

const RaffleWidget: React.FC<iRaffleWidgetProps> = ({
  data,
  push,
  currentSearch,
  getOwnerWidgetContent,
}) => {
  const [isCommentSectionActive, setIsCommentSectionActive] = useState(false);
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

  const onWidgetPress = useCallback(() => {
    push('raffle', {
      raffle_id: data.raffle_id,
      currentSearch,
    });
  }, [data.raffle_id, push, currentSearch]);

  return (
    <VStack w="full" h="container" alignItems="center">
      <HStack
        space={4}
        alignItems="center"
        justifyContent="center"
        backgroundColor="#fff"
        borderTopLeftRadius="2xl"
        borderTopRightRadius="2xl"
        px="3"
        py="1"
      >
        <Avatar
          source={
            data?.owner.user_photo_url
              ? { uri: data.owner.user_photo_url }
              : require('@/assets/jpg/no-profile-pic.jpg')
          }
          size="sm"
        />
        <Text
          content={getOwnerWidgetContent(data.owner)}
          color={THEME.colors.dark_text_color}
          fontSize="small"
          fontWeight="bold"
        />
      </HStack>
      <Pressable
        w="full"
        flex={1}
        minHeight="422px"
        _pressed={{
          opacity: 0.85,
        }}
        mb="3"
        onPress={onWidgetPress}
      >
        <View flex={1} position="relative" borderRadius="2xl" overflow="hidden">
          <Video
            source={{ uri: data.raffle_demo_video_url || '' }}
            ref={videoRef}
            resizeMode={ResizeMode.COVER}
            // @ts-ignore
            onPlaybackStatusUpdate={setVideoStatus}
            useNativeControls={false}
            isLooping
            isMuted
            style={{
              width: WINDOW_WIDTH - 32,
              height: 422,
              zIndex: 1,
            }}
          />
          <View
            position="absolute"
            top={0}
            left={0}
            h="full"
            w="full"
            justifyContent="center"
            alignItems="center"
            zIndex={2}
          >
            <Feather
              name={videoStatus?.isPlaying ? 'pause' : 'play'}
              color="#D9D9D9"
              size={50}
            />
            <Pressable onPress={() => setIsCommentSectionActive(true)}>
              <Feather name="message-circle" size={40} color="#fff" />
            </Pressable>
          </View>
        </View>
      </Pressable>
      {isCommentSectionActive ? (
        <RaffleComments
          raffle_id={data.raffle_id}
          handleClose={() => setIsCommentSectionActive(false)}
        />
      ) : null}
    </VStack>
  );
};

export default RaffleWidget;
