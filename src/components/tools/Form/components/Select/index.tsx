import React, { useMemo } from 'react';
import { Feather } from '@expo/vector-icons';
import { Controller, useFormContext } from 'react-hook-form';
import {
  Select as NBSelect,
  ISelectProps,
  FormControl,
  IconButton,
} from 'native-base';

import { THEME } from '@/styles/theme.styles';
import Loader from '@/components/layout/Loader';

import { getErrorMessage } from '../../utils/get-error-message.util';

export interface iSelectProps extends ISelectProps {
  name: string | symbol | number;
  options: Maybe<SelectOptions>;
  isLoading?: boolean;
}

const Select: React.FC<iSelectProps> = ({
  name,
  options,
  isLoading,
  placeholder,
  accessibilityLabel,
  ...rest
}) => {
  const stringfyedName = useMemo(() => name.toString(), [name]);
  const placeholderOption = useMemo(
    () => accessibilityLabel || placeholder,
    [accessibilityLabel, placeholder]
  );

  const {
    clearErrors,
    formState: { errors },
    reset,
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
          <NBSelect
            selectedValue={field.value}
            onValueChange={(itemValue) => {
              field.onChange(itemValue);
              clearErrors(stringfyedName);
            }}
            borderRadius="full"
            w="full"
            h="full"
            fontFamily={THEME.fonts.medium}
            bg="#fff"
            fontSize="md"
            borderColor="black"
            focusable={false}
            isFocusVisible={false}
            isFocused={false}
            placeholder={placeholderOption}
            accessibilityLabel={placeholderOption}
            _item={{
              borderRadius: 'lg',
              _important: {
                fontFamily: THEME.fonts.bold,
                fontSize: 'md',
              },
            }}
            dropdownIcon={
              isLoading ? (
                <Loader size={24} />
              ) : (
                <Feather
                  name="chevron-down"
                  size={24}
                  color="#d0cfcf"
                  style={{ marginRight: 10 }}
                />
              )
            }
            collapsable={true}
            pl="5"
            _selectedItem={{
              fontSize: 'md',
              bg: THEME.colors.orange_color,
              borderRadius: 'lg',
              _important: {
                color: '#fff',
              },
            }}
            {...rest}
          >
            {placeholderOption ? (
              <NBSelect.Item label={placeholderOption} value="" isDisabled />
            ) : null}
            {options?.map((option, index) => (
              <NBSelect.Item
                {...option}
                fontFamily={THEME.fonts.bold}
                key={index}
              />
            ))}
          </NBSelect>
          <FormControl.ErrorMessage ml="4" fontFamily={THEME.fonts.bold}>
            {fieldError?.message?.toString()}
          </FormControl.ErrorMessage>
        </FormControl>
      )}
    />
  );
};

export default Select;
