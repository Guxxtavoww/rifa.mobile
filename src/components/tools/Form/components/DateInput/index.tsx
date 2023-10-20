import React, { memo, useCallback, useMemo, useState } from 'react';
import RNDateTimePicker, {
  BaseProps,
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
}

const DateInput: React.FC<iDateInputProps> = ({
  name,
  defaultPickerShowing,
  label,
  ...rest
}) => {
  const [currentDateInputValue, setCurrentDateInputValue] = useState<string>();
  const [isDatePickerShowing, setIsDatePickerShowing] = useState(
    !!defaultPickerShowing
  );

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
      defaultValue=""
      render={({ field }) => (
        <FormControl
          mb={!!fieldError?.message ? 8 : 4}
          h={'12'}
          isInvalid={!!fieldError?.message}
          alignItems="flex-start"
        >
          <HStack space={label ? 3 : undefined} alignItems="center">
            <Pressable
              onPress={() => {
                setIsDatePickerShowing((prev) => {
                  if (currentDateInputValue) {
                    setCurrentDateInputValue(undefined);

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
                    name={currentDateInputValue ? 'close' : 'calendar-today'}
                  />
                }
                size={25}
              />
            </Pressable>
            <Text
              content={
                currentDateInputValue
                  ? formatToDate(currentDateInputValue)
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
              value={new Date(field.value || Date.now())}
              display="calendar"
              collapsable
              focusable
              style={{
                backgroundColor: THEME.colors.orange_color,
              }}
              onChange={(e) => {
                const stringfyedValue = String(
                  new Date(e.nativeEvent?.timestamp ?? Date.now())
                );

                clearErrors();
                setIsDatePickerShowing(false);
                setCurrentDateInputValue(stringfyedValue);
                field.onChange(stringfyedValue);
              }}
              onAccessibilityEscape={() => {
                field.onChange(undefined);
                setIsDatePickerShowing(false);
              }}
              {...rest}
            />
          ) : null}
          <FormControl.ErrorMessage ml="4">
            {fieldError?.message?.toString()}
          </FormControl.ErrorMessage>
        </FormControl>
      )}
    />
  );
};

export default memo(DateInput);
