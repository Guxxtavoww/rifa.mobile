import React from 'react';
import { FlatList, VStack } from 'native-base';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/layout/Button';
import { THEME } from '@/styles/theme.styles';

import { iFormProps } from './types/props.types';
import { mapInputs } from './utils/map-inputs';

function Form<T extends FieldValues>({
  handleSubmit,
  inputs,
  zodSchema,
  submitButtonText,
  isLoading,
}: iFormProps<T>) {
  const methods = useForm<T>({
    resolver: zodSchema ? zodResolver(zodSchema) : undefined,
  });

  const {
    handleSubmit: handleHookFormSubmit,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <VStack width="full" mb="1">
        <FlatList
          data={inputs}
          keyExtractor={(_, index) => `${index}`}
          renderItem={({ item, index }) => mapInputs(item, index)}
          showsVerticalScrollIndicator
          scrollEnabled
        />
      </VStack>
      <Button
        buttonProps={{
          onPress: handleHookFormSubmit(handleSubmit),
          isLoading,
          _pressed: {
            backgroundColor: 'orange.900',
          },
        }}
        textProps={{
          content: submitButtonText || 'Enviar',
          type: 'text',
          style: {
            fontSize: THEME.fontsSizes.small,
          },
        }}
      />
    </FormProvider>
  );
}

export default Form;
