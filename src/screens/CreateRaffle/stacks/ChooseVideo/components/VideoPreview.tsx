import React from 'react';
import { ResizeMode } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons';
import { Center, Pressable, View } from 'native-base';

import { DemoVideo } from '@/components';
import { WINDOW_WIDTH } from '@/constants';
import { THEME } from '@/styles/theme.styles';

interface iVideoPreviewProps {
  videoUri: string;
  onClearButtonPress: () => void;
}

const VideoPreview: React.FC<iVideoPreviewProps> = ({
  onClearButtonPress,
  videoUri,
}) => (
  <View
    w="full"
    position="relative"
    minH="480px"
    borderRadius="md"
    borderColor={THEME.colors.subtitle_color}
  >
    <Pressable
      p="2"
      borderRadius="full"
      _pressed={{
        bg: 'gray.800',
      }}
      onPress={onClearButtonPress}
      zIndex="12"
      w="12"
      h="12"
      style={{
        position: 'absolute',
        top: 5,
        right: 5,
      }}
    >
      <Center>
        <MaterialIcons
          name="delete-forever"
          color={THEME.colors.red_color}
          size={25}
        />
      </Center>
    </Pressable>
    <DemoVideo
      source={{ uri: videoUri }}
      resizeMode={ResizeMode.COVER}
      style={{
        width: WINDOW_WIDTH - 32,
        height: 480,
        borderRadius: 12,
        maxHeight: 480,
      }}
    />
  </View>
);

export default VideoPreview;
