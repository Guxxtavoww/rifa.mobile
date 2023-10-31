import React, { useCallback } from 'react';
import { View, VStack, Image, Pressable } from 'native-base';

import { Text } from '@/components';
import { formatToCurrency } from '@/utils/string.utils';

import { iRaffle } from '../types/responses.types';

interface iRaffleWidgetProps {
  data: iRaffle;
  push: ScreenProps['navigation']['push'];
}

const RaffleWidget: React.FC<iRaffleWidgetProps> = ({ data, push }) => {
  const onWidgetPress = useCallback(() => {
    push('raffle', {
      raffle_id: data.raffle_id,
    });
  }, [data.raffle_id, push]);

  return (
    <Pressable
      w="full"
      minH="200px"
      maxHeight="200px"
      _pressed={{
        opacity: 0.85,
      }}
      mb="2"
      onPress={onWidgetPress}
    >
      <View w="full" position="relative" borderRadius="md" overflow="hidden">
        <Image
          source={{ uri: data.photos[0].photo_url }}
          w="full"
          h="full"
          borderRadius="md"
          alt="Raffle Image"
          style={{
            objectFit: 'cover',
          }}
        />
        <VStack
          h="1/2"
          w="full"
          shadow="9"
          alignItems="flex-end"
          py="1.5"
          px="2"
          zIndex={2}
          position="absolute"
          bottom="0"
          borderBottomRightRadius="md"
          borderBottomLeftRadius="md"
        >
          <Text
            content={formatToCurrency(data.raffle_subscription_price)}
            fontWeight="bold"
            fontSize="extraSmall"
          />
          <Text
            content={data.raffle_title}
            fontWeight="bold"
            fontSize="large"
          />
        </VStack>
      </View>
    </Pressable>
  );
};

export default RaffleWidget;
