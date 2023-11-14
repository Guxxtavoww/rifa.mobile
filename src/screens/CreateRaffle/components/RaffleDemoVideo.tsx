import React from 'react';
import { Pressable, View } from 'native-base';
import { Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { DemoVideo } from '@/components';
import { THEME } from '@/styles/theme.styles';

interface iRaffleDemoVideoProps {
  videoUri: string;
  onClearButtonPress: () => void;
}

const RaffleDemoVideo: React.FC<iRaffleDemoVideoProps> = ({
  videoUri,
  onClearButtonPress,
}) => (
  <View
    w="full"
    h="200px"
    position="relative"
    shadow="2"
    mt="3"
    borderWidth="1"
    borderColor={THEME.colors.subtitle_color}
  >
    <DemoVideo
      source={{ uri: videoUri }}
      style={{ width: Dimensions.get('window').width - 23, height: 200 }}
    />
    <Pressable
      position="absolute"
      top="1"
      right="1"
      w="10"
      h="10"
      justifyContent="center"
      alignItems="center"
      onPress={onClearButtonPress}
      borderRadius="full"
      zIndex={10}
      _pressed={{
        bg: 'gray.300',
      }}
    >
      <Feather name="trash" color={THEME.colors.dark_text_color} size={20} />
    </Pressable>
  </View>
);

export default RaffleDemoVideo;
