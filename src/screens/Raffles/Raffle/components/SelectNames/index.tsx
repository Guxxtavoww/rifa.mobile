import React, { useCallback, useEffect, useState } from 'react';
import { View, VStack, HStack } from 'native-base';

import { Text } from '@/components';
import { THEME } from '@/styles/theme.styles';

import SelectNamesInput from './SelectNamesInput';
import SelectNamesIconButton from './SelectNamesIconButton';

interface iSelectNamesProps {
  defaultAmount?: number;
  maxAmountOfNames: number;
  onSelectNameAmount: (amount: number) => void;
}

const SelectNames: React.FC<iSelectNamesProps> = ({
  onSelectNameAmount,
  defaultAmount = 1,
  maxAmountOfNames,
}) => {
  const [namesAmount, setNamesAmount] = useState(defaultAmount);

  const handleIconsPress = useCallback(
    (type: 'add' | 'subtract') => {
      setNamesAmount((prev) => {
        if (type === 'add') {
          return prev < maxAmountOfNames ? prev + 1 : prev;
        }

        return prev > 0 ? prev - 1 : prev;
      });
    },
    [setNamesAmount, maxAmountOfNames]
  );

  const handleInputChange = useCallback(
    (value: number) => {
      setNamesAmount((prev) => {
        if (value > maxAmountOfNames) return prev;

        return value >= 0 ? value : prev;
      });
    },
    [setNamesAmount, maxAmountOfNames]
  );

  useEffect(() => {
    onSelectNameAmount(namesAmount);
  }, [namesAmount, onSelectNameAmount]);

  return (
    <View
      w="full"
      h="225px"
      borderRadius="2xl"
      justifyContent="center"
      alignItems="center"
      px="3"
      py="3"
      backgroundColor="#fff"
    >
      <VStack w="full" alignItems="center" space={2}>
        <Text
          content="Selecione a quantidade de números"
          color={THEME.colors.dark_text_color}
          fontSize="normalLarge"
          fontWeight="medium"
          style={{
            textAlign: 'center',
          }}
        />
        <HStack justifyContent="center" alignItems="center" space={8} w="full">
          <SelectNamesIconButton
            icon="subtract"
            onPress={() => handleIconsPress('subtract')}
          />
          <SelectNamesInput
            value={namesAmount.toString()}
            onChangeText={handleInputChange}
          />
          <SelectNamesIconButton
            icon="add"
            onPress={() => handleIconsPress('add')}
          />
        </HStack>
      </VStack>
    </View>
  );
};

export default SelectNames;
