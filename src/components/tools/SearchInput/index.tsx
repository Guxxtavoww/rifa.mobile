import React, { memo, useCallback, useRef, useState } from 'react';
import { TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
  FormControl,
  IInputProps,
  Icon,
  Input as NBInput,
  Pressable,
} from 'native-base';

import { THEME } from '@/styles/theme.styles';
import Loader from '@/components/layout/Loader';

export interface iSearchInputProps extends Omit<IInputProps, 'isLoading'> {
  onPressSearchIcon?: (value: string) => void | Promise<void>;
  onSubmitKeyboard?: (value: string) => void | Promise<void>;
  isLoading?: boolean;
}

const SearchInput: React.FC<iSearchInputProps> = ({
  onPressSearchIcon,
  onSubmitKeyboard,
  isLoading,
  ...nbInputProps
}) => {
  const [inputValue, setInputValue] = useState<string>('');

  const searchInputRef = useRef<TextInput>(null);

  const handleChangeText = useCallback(
    (text: string) => {
      setInputValue(text);
    },
    [setInputValue]
  );

  const focusOnInput = useCallback(() => {
    searchInputRef.current?.focus();
  }, []);

  return (
    <FormControl mb={nbInputProps.mb ?? '2'} w="full" h="12">
      <NBInput
        w="full"
        h="full"
        bg="#fff"
        fontSize="md"
        borderRadius="sm"
        shadow="1"
        ref={searchInputRef}
        color={THEME.colors.dark_text_color}
        borderWidth={1}
        borderColor="gray.500"
        autoCapitalize="none"
        autoFocus={false}
        textDecoration="none"
        value={inputValue}
        onChangeText={(text) => {
          handleChangeText(text);
          if (nbInputProps?.onChangeText) nbInputProps.onChangeText(text);
        }}
        placeholderTextColor={THEME.colors.subtitle_color}
        fontFamily={THEME.fonts.bold}
        isDisabled={isLoading || nbInputProps.isDisabled}
        _focus={{
          borderWidth: 1.5,
          borderColor: THEME.colors.screen_dark_background,
          bg: '#fff',
          shadow: '2',
          placeholderTextColor: '#cecece',
        }}
        onSubmitEditing={() => {
          if (onSubmitKeyboard) onSubmitKeyboard(inputValue);
        }}
        InputRightElement={
          isLoading ? (
            <Loader size={16} style={{ marginRight: 5 }} />
          ) : (
            <Pressable
              onPress={() => {
                focusOnInput();
                if (onPressSearchIcon) onPressSearchIcon(inputValue);
              }}
              p="1.5"
              mr="1"
              borderRadius="full"
              _pressed={{
                bg: 'gray.200',
              }}
            >
              <Icon as={<MaterialIcons name="search" />} size={25} />
            </Pressable>
          )
        }
        {...nbInputProps}
      />
    </FormControl>
  );
};

export default memo(SearchInput);
