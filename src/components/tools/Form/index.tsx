import React from 'react';
import { FlatList, VStack } from 'native-base';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/layout/Button';

import { iFormProps } from './types/props.types';
import { mapInputs } from './utils/map-inputs';

function Form<T extends FieldValues>({
  handleSubmit,
  inputs,
  zodSchema,
  submitButtonText,
  isLoading,
  themeType,
  customAction1,
  customAction2,
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
          renderItem={({ item, index }) => mapInputs(item, index, themeType)}
          showsVerticalScrollIndicator
          scrollEnabled
        />
      </VStack>
      {customAction1 ? <Button {...customAction1} mb="3" /> : null}
      {customAction2 ? <Button {...customAction2} mb="3" /> : null}
      <Button
        onPress={handleHookFormSubmit(handleSubmit)}
        isLoading={isLoading}
        content={submitButtonText || 'Enviar'}
      />
    </FormProvider>
  );
}

export default Form;
