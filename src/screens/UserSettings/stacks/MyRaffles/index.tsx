import React from 'react';
import { View } from 'react-native';
import { HStack } from 'native-base';

import { Button } from '@/components';

const MyRaffles: React.FC = () => {
  return (
    <>
      <HStack
        space={2}
        px={1}
        justifyContent="space-between"
        alignItems="center"
        w="full"
      >
        <Button content="Rifas a finalizar" flex="1" borderRadius="full" />
        <Button content="Finalizadas" flex="1" borderRadius="full" />
      </HStack>
    </>
  );
};

export default MyRaffles;
