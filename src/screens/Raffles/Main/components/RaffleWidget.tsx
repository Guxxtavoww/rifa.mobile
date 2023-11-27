import React, { useCallback, useMemo } from 'react';
import { View, VStack, Image, Pressable, HStack, Avatar } from 'native-base';

import { Text } from '@/components';
import { THEME } from '@/styles/theme.styles';

import { iMainRaffle } from '../types/responses.types';

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
  const onWidgetPress = useCallback(() => {
    push('raffle', {
      raffle_id: data.raffle_id,
      currentSearch,
    });
  }, [data.raffle_id, push, currentSearch]);

  return (
    <VStack w="full" h="container" alignItems="flex-start">
      <HStack
        space={4}
        alignItems="center"
        justifyContent="center"
        backgroundColor="#fff"
        borderTopLeftRadius="2xl"
        borderTopRightRadius="2xl"
        px="3"
        py="1"
        marginLeft="3"
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
        minH="200px"
        maxHeight="200px"
        _pressed={{
          opacity: 0.85,
        }}
        mb="3"
        onPress={onWidgetPress}
      >
        <View w="full" position="relative" borderRadius="2xl" overflow="hidden">
          <Image
            source={{ uri: data.main_raffle_photo_url || '' }}
            w="full"
            h="full"
            borderRadius="2xl"
            alt="Raffle Image"
            style={{
              objectFit: 'cover',
            }}
          />
          <VStack
            h="1/2"
            w="full"
            shadow="9"
            alignItems="flex-start"
            py="1.5"
            px="2"
            zIndex={2}
            position="absolute"
            bottom="0"
            borderBottomRightRadius="md"
            borderBottomLeftRadius="md"
          >
            <Text
              content={data.raffle_title}
              fontWeight="bold"
              fontSize="extraLarge"
            />
          </VStack>
        </View>
      </Pressable>
    </VStack>
  );
};

export default RaffleWidget;
