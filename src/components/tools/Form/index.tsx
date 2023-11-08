import React, { useCallback } from 'react';
import { VStack, FlatList } from 'native-base';
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
  hideSubmitButton,
  bottomFormElement,
  resetAfterSubmit,
  onResetForm,
}: iFormProps<T>) {
  const methods = useForm<T>({
    resolver: zodSchema ? zodResolver(zodSchema) : undefined,
  });

  const { handleSubmit: handleHookFormSubmit, reset, clearErrors } = methods;

  const onReset = useCallback(() => {
    clearErrors();

    if (resetAfterSubmit) {
      inputs?.forEach((input) => {
        // @ts-ignore
        reset({ inputName: input.name });
      });
    }

    if (onResetForm) onResetForm();
  }, [inputs, resetAfterSubmit, onResetForm]);

  return (
    <FormProvider {...methods}>
      <VStack width="full" mb="1" h="container">
        <FlatList
          data={inputs}
          keyExtractor={(_, index) => `${index}`}
          renderItem={({ item, index }) => mapInputs(item, index, themeType)}
          showsVerticalScrollIndicator
          scrollEnabled
        />
      </VStack>
      {bottomFormElement ? bottomFormElement : null}
      {customAction1 ? (
        <Button {...customAction1} isLoading={isLoading} mb="3" />
      ) : null}
      {customAction2 ? (
        <Button {...customAction2} isLoading={isLoading} mb="3" />
      ) : null}
      {hideSubmitButton ? null : (
        <Button
          onPress={handleHookFormSubmit(async (data) => {
            await handleSubmit(data);
            onReset();
          })}
          isLoading={isLoading}
          content={submitButtonText || 'Enviar'}
        />
      )}
    </FormProvider>
  );
}

export default Form;
