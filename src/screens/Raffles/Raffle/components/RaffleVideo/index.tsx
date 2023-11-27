import React from 'react';
import { View } from 'native-base';

import { DemoVideo, Text } from '@/components';
import { WINDOW_WIDTH } from '@/constants';

interface iRaffleVideoProps {
  uri: Maybe<string>;
}

const RaffleVideo: React.FC<iRaffleVideoProps> = ({ uri }) => (
  <View w="full" position="relative" minH="290px">
    <DemoVideo
      source={{ uri: uri || '' }}
      videoStyle={{
        borderRadius: 12,
        width: WINDOW_WIDTH - 32,
        minHeight: 290,
      }}
    />
  </View>
);

export default RaffleVideo;
