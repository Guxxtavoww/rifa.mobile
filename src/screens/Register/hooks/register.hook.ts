import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';

import { RegisterFormType } from '../types/form.types';
import { registerUserAPI } from '../api/register.api';

export function useRegister() {
  const { mutate: registerMutation, isLoading } = useMutation({
    mutationFn: (userPayload: RegisterFormType) => registerUserAPI(userPayload),
  });

  const handleSubmit = useCallback(
    async (data: RegisterFormType) => {
      registerMutation(data);
    },
    [registerMutation]
  );

  return {
    handleSubmit,
    isLoading,
  };
}
