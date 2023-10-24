import React, { memo, useCallback, useMemo, useState } from 'react';
import RNDateTimePicker, {
  BaseProps,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';
import { FormControl, HStack, Icon, Pressable } from 'native-base';
import { Controller, useFormContext } from 'react-hook-form';

import Text from '@/components/layout/Text';
import { THEME } from '@/styles/theme.styles';
import { formatToDate } from '@/utils/date.utils';

import { getErrorMessage } from '../../utils/get-error-message.util';

export interface iDateInputProps extends Omit<BaseProps, 'onChange' | 'value'> {
  name: string | number | symbol;
  defaultPickerShowing?: boolean;
  label?: string;
  defaultPickerValue?: Date;
}

const DateInput: React.FC<iDateInputProps> = ({
  name,
  defaultPickerShowing,
  label,
  defaultPickerValue,
  ...rest
}) => {
  const [isDatePickerShowing, setIsDatePickerShowing] = useState(
    !!defaultPickerShowing
  );

  const stringfyedName = useMemo(() => name.toString(), [name]);

  const {
    clearErrors,
    formState: { errors },
    setValue,
  } = useFormContext();

  const handleChange = useCallback(
    (event: DateTimePickerEvent, selectedDate?: Date) => {
      if (event.type === 'set' && selectedDate) {
        const stringfyedValue = String(new Date(selectedDate ?? Date.now()));

        clearErrors(stringfyedName);
        setValue(stringfyedName, stringfyedValue);
      }
      setIsDatePickerShowing(false);
    },
    [clearErrors, stringfyedName, setValue]
  );

  const fieldError = useMemo(
    () => getErrorMessage(errors, stringfyedName),
    [errors, stringfyedName]
  );

  return (
    <Controller
      name={stringfyedName}
      defaultValue={defaultPickerValue}
      render={({ field }) => (
        <FormControl
          mb={!!fieldError?.message ? 8 : 4}
          h={'12'}
          isInvalid={!!fieldError?.message}
          alignItems="flex-start"
        >
          <HStack space={3} alignItems="center">
            <Pressable
              onPress={() => {
                setIsDatePickerShowing((prev) => {
                  if (field.value) {
                    clearErrors();
                    field.onChange(undefined);

                    return false;
                  }

                  return !prev;
                });
              }}
              _pressed={{
                bg: 'gray.200',
              }}
            >
              <Icon
                as={
                  <MaterialIcons
                    name={field.value ? 'close' : 'calendar-today'}
                  />
                }
                size={28}
                color={!!fieldError?.message ? 'red.500' : 'gray.500'}
              />
            </Pressable>
            <Text
              content={
                field.value
                  ? formatToDate(field.value)
                  : label || 'Insira uma data'
              }
              fontSize="small"
              color={fieldError?.message ? 'red' : THEME.colors.subtitle_color}
              fontWeight="medium"
              onPress={() => setIsDatePickerShowing(true)}
            />
          </HStack>
          {isDatePickerShowing ? (
            <RNDateTimePicker
              value={new Date(field.value ?? Date.now())}
              display="inline"
              collapsable
              focusable
              accentColor={THEME.colors.orange_color}
              style={{
                backgroundColor: THEME.colors.orange_color,
              }}
              onChange={handleChange}
              {...rest}
            />
          ) : null}
          <FormControl.ErrorMessage ml="4" fontFamily={THEME.fonts.bold}>
            {fieldError?.message?.toString()}
          </FormControl.ErrorMessage>
        </FormControl>
      )}
    />
  );
};

export default memo(DateInput);
