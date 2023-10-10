import React from 'react';
import { FlatList, VStack } from 'native-base';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/layout/Button';

import { iFormProps } from './types/props.types';
import { mapInputs } from './utils/map-inputs';
import { THEME } from '@/styles/theme.styles';

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

  const { handleSubmit: handleHookFormSubmit } = methods;

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
        buttonProps={{ onPress: handleHookFormSubmit(handleSubmit), isLoading }}
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
