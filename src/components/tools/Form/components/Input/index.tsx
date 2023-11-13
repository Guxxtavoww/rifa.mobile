import React, { useCallback, useMemo } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { FormControl, IInputProps, Input as NBInput } from 'native-base';

import { THEME } from '@/styles/theme.styles';

import { getErrorMessage } from '../../utils/get-error-message.util';
import { handleKeyboardType } from './input.utils';
import { isNullableValue } from '@/utils/app.utils';

export interface iInputProps
  extends Omit<
    IInputProps,
    'fontSize' | 'type' | 'onChangeText' | 'isInvalid' | 'defaultValue'
  > {
  name: string | number | symbol;
  type?: 'text' | 'number' | 'password' | 'email' | 'decimal';
  onChangeText?: (newValue: string | number) => void;
  errorMessage?: Maybe<string>;
  defaultValue?: Maybe<string>;
  themeType?: 'dark' | 'light';
}

const Input: React.FC<iInputProps> = ({
  name,
  type = 'text',
  onChangeText,
  defaultValue,
  themeType = 'dark',
  w,
  ...rest
}) => {
  const stringfyedName = useMemo(() => name.toString(), [name]);
  const {
    clearErrors,
    setValue,
    setError,
    formState: { errors },
  } = useFormContext();

  const fieldError = useMemo(
    () => getErrorMessage(errors, stringfyedName),
    [errors, stringfyedName]
  );

  const handleChangeText = useCallback(
    (newText: string, onChange: (...event: any[]) => void) => {
      clearErrors();

      const isNumberType = type === 'number';
      const newValue = isNumberType ? +newText : newText;

      if (isNumberType && Number.isNaN(newValue)) {
        setError(stringfyedName, {
          message: 'Insira um número válido',
        });
      }

      if (onChangeText) onChangeText(newValue);
      onChange(newValue);
    },
    [onChangeText, clearErrors, setValue, stringfyedName]
  );

  return (
    <Controller
      name={stringfyedName}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormControl
          mb={rest.mb ?? !!fieldError?.message ? 8 : 4}
          h={rest.h || '12'}
          isInvalid={!!fieldError?.message}
          w={w || 'full'}
          flex={rest.flex ?? 1}
        >
          <NBInput
            bg="gray.700"
            fontSize="md"
            px={rest.px ?? 5}
            isInvalid={!!fieldError?.message}
            secureTextEntry={type === 'password'}
            h="full"
            w="full"
            borderRadius="full"
            borderColor="black"
            backgroundColor={
              themeType === 'dark' ? 'gray.700' : THEME.colors.light_text_color
            }
            color={
              themeType === 'dark'
                ? THEME.colors.light_text_color
                : THEME.colors.dark_text_color
            }
            keyboardType={handleKeyboardType(type)}
            onChangeText={(newText) => {
              handleChangeText(newText, field.onChange);
            }}
            fontFamily={THEME.fonts.medium}
            value={
              isNullableValue(String(field.value))
                ? undefined
                : String(field.value)
            }
            _invalid={{
              borderWidth: 2,
              borderColor: 'red.500',
              color: 'red.500',
            }}
            _focus={{
              bgColor:
                themeType === 'dark'
                  ? 'gray.200'
                  : THEME.colors.light_text_color,
              borderWidth: 2,
              borderColor: THEME.colors.orange_color,
              color: THEME.colors.dark_text_color,
            }}
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

export default Input;
