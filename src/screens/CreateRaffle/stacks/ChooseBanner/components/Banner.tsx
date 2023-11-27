import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Center, HStack, Image, Pressable, VStack, View } from 'native-base';

interface iBannerProps {
  bannerUri: Maybe<string>;
  onClearBanner: () => void;
  handleChooseRaffleBanner: () => Promise<void>;
}

const Banner: React.FC<iBannerProps> = ({
  bannerUri,
  onClearBanner,
  handleChooseRaffleBanner,
}) => (
  <HStack w="full" borderRadius="xl" bg="#fff" px="2" py="5" space={2}>
    <View flex={1}>
      <Center>
        {!bannerUri ? (
          <TouchableOpacity onPress={handleChooseRaffleBanner}>
            <FontAwesome name="picture-o" size={50} color="#d9d9d9" />
          </TouchableOpacity>
        ) : (
          <Pressable onPress={onClearBanner}>
            <Image
              source={{ uri: bannerUri }}
              w="150px"
              h="130px"
              borderRadius="xl"
              alt="Banner"
            />
          </Pressable>
        )}
      </Center>
    </View>
    <VStack flex={3} alignItems="center" px="2" space={4}>
      <View w="full" borderRadius="md" bg="#ECECEC" h="3" />
      <View w="full" borderRadius="md" bg="#ECECEC" h="3" />
      <View w="full" borderRadius="md" bg="#ECECEC" h="3" />
    </VStack>
  </HStack>
);

export default Banner;
