import React, { useCallback, useState } from 'react';
import { View, VStack, HStack } from 'native-base';

import { useRedux } from '@/hooks';
import { Button, Text } from '@/components';
import { THEME } from '@/styles/theme.styles';
import { formatToCurrency } from '@/utils/string.utils';

import SelectNamesInput from './SelectNamesInput';
import SelectNamesIconButton from './SelectNamesIconButton';

interface iSelectNamesProps {
  defaultAmount?: number;
  maxAmountOfNames: number;
  namePrice: number | undefined;
  onSelectNameAmount: (amount: number) => void;
  isLoading: boolean;
  owner_id: string;
}

const SelectNames: React.FC<iSelectNamesProps> = ({
  onSelectNameAmount,
  defaultAmount = 1,
  maxAmountOfNames,
  namePrice,
  isLoading,
  owner_id,
}) => {
  const doesCurrentUserOwnsRaffle = useRedux().useAppSelector(
    (state) => state.auth.user_data!.user_id === owner_id
  );

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
        <HStack
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          space={8}
          w="full"
        >
          <SelectNamesIconButton
            icon="subtract"
            onPress={() => handleIconsPress('subtract')}
            isDisabled={isLoading === true}
          />
          <SelectNamesInput
            value={namesAmount.toString()}
            onChangeText={handleInputChange}
          />
          <SelectNamesIconButton
            icon="add"
            onPress={() => handleIconsPress('add')}
            isDisabled={isLoading === true}
          />
        </HStack>
        {!doesCurrentUserOwnsRaffle ? (
          <VStack alignItems="flex-start" w="full" space={2}>
            <Text
              content={`Total: ${formatToCurrency(
                namesAmount * (namePrice ?? 1)
              )}`}
              color={THEME.colors.dark_text_color}
              fontSize="normalLarge"
              fontWeight="medium"
              style={{
                marginLeft: 6,
              }}
            />
            <Button
              content="Comprar"
              bg="#67AB76"
              textFontWeight="bold"
              _pressed={{
                backgroundColor: 'green.200',
              }}
              onPress={() => onSelectNameAmount(namesAmount)}
              isLoading={isLoading}
              borderRadius="full"
            />
          </VStack>
        ) : null}
      </VStack>
    </View>
  );
};

export default SelectNames;
