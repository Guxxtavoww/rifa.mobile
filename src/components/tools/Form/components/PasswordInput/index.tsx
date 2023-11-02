import { MaterialIcons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import {
  FormControl,
  IInputProps,
  Input as NBInput,
  Pressable,
  Icon,
} from 'native-base';

import { THEME } from '@/styles/theme.styles';

import { getErrorMessage } from '../../utils/get-error-message.util';

export interface iPasswordInputProps
  extends Omit<
    IInputProps,
    'fontSize' | 'type' | 'onChangeText' | 'isInvalid' | 'defaultValue'
  > {
  name: string | number | symbol;
  type?: 'password';
  errorMessage?: Maybe<string>;
  themeType?: 'dark' | 'light';
}

const PasswordInput: React.FC<iPasswordInputProps> = ({
  name,
  type = 'text',
  themeType = 'dark',
  ...rest
}) => {
  const isDarkTheme = useMemo(() => themeType === 'dark', [themeType]);

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const stringfyedName = useMemo(() => name.toString(), [name]);
  const {
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const fieldError = useMemo(
    () => getErrorMessage(errors, stringfyedName),
    [errors, stringfyedName]
  );

  return (
    <Controller
      name={stringfyedName}
      render={({ field }) => (
        <FormControl
          mb={rest.mb ?? !!fieldError?.message ? 8 : 4}
          h={rest.h || '12'}
          isInvalid={!!fieldError?.message}
        >
          <NBInput
            w="full"
            borderRadius="full"
            fontSize="md"
            borderColor="black"
            px={rest.px ?? 5}
            h="full"
            fontFamily={THEME.fonts.medium}
            type={isPasswordVisible ? 'text' : 'password'}
            value={field.value}
            autoCapitalize="none"
            blurOnSubmit
            backgroundColor={
              isDarkTheme ? 'gray.700' : THEME.colors.light_text_color
            }
            color={
              isDarkTheme
                ? THEME.colors.light_text_color
                : THEME.colors.dark_text_color
            }
            _focus={{
              bgColor: isDarkTheme ? 'gray.200' : THEME.colors.light_text_color,
              borderWidth: 2,
              borderColor: THEME.colors.orange_color,
              color: THEME.colors.dark_text_color,
            }}
            _invalid={{
              borderWidth: 2,
              borderColor: 'red.500',
              color: 'red.500',
            }}
            onChangeText={(text) => {
              field.onChange(text);
              clearErrors();
            }}
            InputRightElement={
              <Pressable onPress={() => setIsPasswordVisible((prev) => !prev)}>
                <Icon
                  as={
                    <MaterialIcons
                      name={isPasswordVisible ? 'visibility' : 'visibility-off'}
                    />
                  }
                  size={7}
                  mr="2"
                  color="muted.400"
                />
              </Pressable>
            }
            {...rest}
          />
          <FormControl.ErrorMessage ml="4" fontFamily={THEME.fonts.bold}>
            {fieldError?.message?.toString()}
          </FormControl.ErrorMessage>
        </FormControl>
      )}
    />
  );
};

export default PasswordInput;
