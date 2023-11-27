import React from 'react';
import { View } from 'native-base';

import { DemoVideo } from '@/components';
import { WINDOW_WIDTH } from '@/constants';

interface iRaffleVideoProps {
  uri: Maybe<string>;
}

const RaffleVideo: React.FC<iRaffleVideoProps> = ({ uri }) => (
  <View w={WINDOW_WIDTH - 32} position="relative" minH="290px">
    <DemoVideo
      source={{ uri: uri || '' }}
      videoStyle={{
        marginBottom: 10,
        width: WINDOW_WIDTH - 32,
        height: 480,
        borderRadius: 12,
      }}
    />
  </View>
);

export default RaffleVideo;
