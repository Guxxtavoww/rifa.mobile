import React, { useCallback, useEffect, useMemo } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { FormControl, IInputProps, Input as NBInput } from 'native-base';

import { THEME } from '@/styles/theme.styles';

import { getErrorMessage } from '../../utils/get-error-message.util';

export interface iInputProps
  extends Omit<
    IInputProps,
    'fontSize' | 'type' | 'onChangeText' | 'isInvalid' | 'defaultValue'
  > {
  name: string | number | symbol;
  type?: 'text' | 'number' | 'password';
  onChangeText?: (newValue: string | number) => void;
  errorMessage?: Maybe<string>;
  defaultValue?: Maybe<string>;
}

const Input: React.FC<iInputProps> = ({
  name,
  type = 'text',
  onChangeText,
  defaultValue,
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
    () => getErrorMessage(errors, name.toString()),
    [errors, stringfyedName]
  );

  const handleChangeText = useCallback(
    (newText: string) => {
      clearErrors();

      const isNumberType = type === 'number';
      const newValue = isNumberType ? +newText : newText;

      if (isNumberType && Number.isNaN(newValue)) {
        setError(stringfyedName, {
          message: 'Insira um número válido',
        });
      }

      if (onChangeText) onChangeText(newValue);
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
        >
          <NBInput
            bg="gray.700"
            fontSize="md"
            px={rest.px ?? 5}
            isInvalid={!!fieldError?.message}
            secureTextEntry={type === 'password'}
            h="full"
            borderRadius="full"
            borderColor="black"
            color={THEME.colors.light_text_color}
            onChangeText={(newText) => {
              handleChangeText(newText);
              field.onChange(newText);
            }}
            fontFamily={THEME.fonts.medium}
            value={field.value}
            _invalid={{
              borderWidth: 2,
              borderColor: 'red.500',
              color: 'red.500',
            }}
            _focus={{
              bgColor: 'gray.200',
              borderWidth: 2,
              borderColor: THEME.colors.orange_color,
              color: THEME.colors.dark_text_color,
            }}
            {...rest}
          />
          <FormControl.ErrorMessage>
            {fieldError?.message?.toString() || ''}
          </FormControl.ErrorMessage>
        </FormControl>
      )}
    />
  );
};

export default Input;
