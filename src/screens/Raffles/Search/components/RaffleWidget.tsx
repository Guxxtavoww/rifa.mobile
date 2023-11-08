import React, { useCallback, useMemo } from 'react';
import { View, VStack, Image, Pressable } from 'native-base';

import { Text } from '@/components';
import { formatToCurrency } from '@/utils/string.utils';

import { iRaffle } from '../types/responses.types';

interface iRaffleWidgetProps {
  data: iRaffle;
  currentSearch?: Maybe<string>;
  push: ScreenProps['navigation']['push'];
}

const RaffleWidget: React.FC<iRaffleWidgetProps> = ({
  data,
  push,
  currentSearch,
}) => {
  const onWidgetPress = useCallback(() => {
    push('raffle', {
      raffle_id: data.raffle_id,
      currentSearch,
    });
  }, [data.raffle_id, push, currentSearch]);

  const photoUri = useMemo(() => data.photos[0]?.photo_url, [data.photos]);

  return (
    <Pressable
      w="full"
      minH="200px"
      maxHeight="200px"
      _pressed={{
        opacity: 0.85,
      }}
      mb="3"
      onPress={onWidgetPress}
    >
      <View w="full" position="relative" borderRadius="2xl" overflow="hidden">
        {photoUri ? (
          <Image
            source={{ uri: photoUri }}
            w="full"
            h="full"
            borderRadius="2xl"
            alt="Raffle Image"
            style={{
              objectFit: 'cover',
            }}
          />
        ) : null}
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
