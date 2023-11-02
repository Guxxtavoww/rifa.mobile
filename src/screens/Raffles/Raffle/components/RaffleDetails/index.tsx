import React from 'react';
import { Avatar, HStack, VStack } from 'native-base';

import { Text } from '@/components';
import { THEME } from '@/styles/theme.styles';

interface iRaffleDetailsProps {
  data: {
    raffle_title: string | undefined;
    raffle_description: string | undefined;
    owner_name: string | undefined;
    owner_photo_url: Maybe<string>;
  };
}

const RaffleDetails: React.FC<iRaffleDetailsProps> = ({ data }) => (
  <VStack
    w="full"
    borderRadius="2xl"
    justifyContent="center"
    alignItems="flex-start"
    px="3"
    py="3"
    backgroundColor="#fff"
    space={3}
  >
    <HStack alignItems="center" w="full" justifyContent="flex-start" space={3}>
      <Avatar
        source={
          data.owner_photo_url
            ? { uri: data.owner_photo_url }
            : require('@/assets/jpg/no-profile-pic.jpg')
        }
        size="sm"
      />
      <Text
        content={`${data.owner_name} é o dono dessa rifa.`}
        color={THEME.colors.dark_text_color}
        fontWeight="bold"
        fontSize="small"
      />
    </HStack>
    <VStack w="full" space={3} justifyContent="center" alignItems="flex-start">
      <Text
        content={data.raffle_title || ''}
        fontSize="large"
        color={THEME.colors.orange_color}
        fontWeight="bold"
      />
      <Text
        content={data.raffle_description || ''}
        color={THEME.colors.dark_text_color}
        fontSize="normal"
        fontWeight="regular"
        style={{
          textAlign: 'justify',
        }}
      />
    </VStack>
  </VStack>
);

export default RaffleDetails;
