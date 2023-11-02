import React from 'react';
import { VStack } from 'native-base';
import { Text } from '@/components';
import { THEME } from '@/styles/theme.styles';

interface iRaffleDetailsProps {
  raffle_title: string | undefined;
  raffle_description: string | undefined;
}

const RaffleDetails: React.FC<iRaffleDetailsProps> = ({
  raffle_description,
  raffle_title,
}) => (
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
    <Text
      content={raffle_title || ''}
      fontSize="large"
      color={THEME.colors.orange_color}
      fontWeight="bold"
    />
    <Text
      content={raffle_description || ''}
      color={THEME.colors.dark_text_color}
      fontSize="normal"
      fontWeight="regular"
      style={{
        textAlign: 'justify',
      }}
    />
  </VStack>
);

export default RaffleDetails;
