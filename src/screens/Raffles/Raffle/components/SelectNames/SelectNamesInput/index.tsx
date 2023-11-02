import React, { useRef } from 'react';
import { Input } from 'native-base';
import { TextInput } from 'react-native';

import { THEME } from '@/styles/theme.styles';

export interface iSelectNamesInputProps {
  value: string;
  onChangeText: (value: number) => void;
}

const SelectNamesInput: React.FC<iSelectNamesInputProps> = ({
  onChangeText,
  value,
}) => {
  const namesInputRef = useRef<TextInput>(null);

  return (
    <Input
      w="20"
      h="20"
      borderRadius="3xl"
      backgroundColor={THEME.colors.grayColor}
      color={THEME.colors.orange_color}
      fontFamily={THEME.fonts.bold}
      pl="1.5"
      fontSize="2xl"
      placeholderTextColor={THEME.colors.dark_text_color}
      ref={namesInputRef}
      keyboardType="number-pad"
      value={value}
      borderColor="transparent"
      onChangeText={(text) => {
        onChangeText(+text);
      }}
      onSubmitEditing={() => {
        namesInputRef.current?.blur();
      }}
      _focus={{
        backgroundColor: '#fff',
        color: THEME.colors.dark_text_color,
        borderColor: THEME.colors.orange_color,
      }}
    />
  );
};

export default SelectNamesInput;
