import React from 'react';
import { HStack, Image, VStack, View } from 'native-base';
import { TouchableOpacity } from 'react-native';

import { Text } from '@/components';
import { THEME } from '@/styles/theme.styles';

import { iRaffle } from '../types/responses.types';

interface iMyRaffleProps {
  data: iRaffle;
  onPressRaffle: (raffle_id: string) => void;
}

const MyRaffle: React.FC<iMyRaffleProps> = ({ data, onPressRaffle }) => (
  <TouchableOpacity
    onPress={() => onPressRaffle(data.raffle_id)}
    style={{
      marginBottom: 10,
    }}
  >
    <HStack space={2} p="4" bg="#fff" borderRadius="3xl">
      <View flex={1}>
        <Image
          source={{ uri: data.main_raffle_photo_url || '' }}
          alt={`Rifa: ${data.raffle_id}`}
          w="150px"
          h="120px"
          borderRadius="2xl"
        />
      </View>
      <VStack flex={3}>
        <Text
          content={data.raffle_title}
          color={THEME.colors.dark_text_color}
          fontWeight="regular"
          fontSize="normalLarge"
        />
      </VStack>
    </HStack>
  </TouchableOpacity>
);

export default MyRaffle;
