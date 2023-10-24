import React, { useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  TextArea as NBTextArea,
  FormControl,
  ITextAreaProps,
} from 'native-base';

import { iInputProps } from '../Input';
import { getErrorMessage } from '../../utils/get-error-message.util';
import { THEME } from '@/styles/theme.styles';

export interface iTextAreaProps
  extends Omit<
    ITextAreaProps,
    'fontSize' | 'type' | 'onChange' | 'isInvalid' | 'defaultValue'
  > {
  themeType?: iInputProps['themeType'];
  name: string | symbol | number;
  onChange?: (text: string) => void;
  defaultValue?: string;
}

const TextArea: React.FC<iTextAreaProps> = ({
  name,
  themeType = 'dark',
  onChange,
  defaultValue,
  ...rest
}) => {
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
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormControl
          mb={rest.mb ?? !!fieldError?.message ? 8 : 4}
          h={rest.h || '20'}
          isInvalid={!!fieldError?.message}
        >
          <NBTextArea
            bg="gray.700"
            fontSize="md"
            px={rest.px ?? 5}
            isInvalid={!!fieldError?.message}
            h="full"
            borderRadius="2xl"
            borderColor="black"
            fontFamily={THEME.fonts.medium}
            backgroundColor={
              themeType === 'dark'
                ? 'gray.700'
                : THEME.colors.screen_white_background
            }
            color={
              themeType === 'dark'
                ? THEME.colors.light_text_color
                : THEME.colors.dark_text_color
            }
            onChangeText={(text) => {
              clearErrors();
              if (onChange) onChange(text);
              field.onChange(text);
            }}
            value={field.value}
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
            autoCompleteType=""
            {...rest}
          />
          <FormControl.ErrorMessage ml="2" fontFamily={THEME.fonts.bold}>
            {fieldError?.message?.toString()}
          </FormControl.ErrorMessage>
        </FormControl>
      )}
    />
  );
};

export default TextArea;
