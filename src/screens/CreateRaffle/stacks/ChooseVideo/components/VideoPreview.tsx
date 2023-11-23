import React from 'react';
import { View } from 'native-base';

import { DemoVideo } from '@/components';
import { WINDOW_WIDTH } from '@/constants';

interface iVideoPreviewProps {
  videoUri: string;
  onClearButtonPress: () => void;
}

const VideoPreview: React.FC<iVideoPreviewProps> = ({
  onClearButtonPress,
  videoUri,
}) => (
  <View w="full" position="relative" h="container" borderRadius="md">
    <DemoVideo
      source={{ uri: videoUri }}
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
