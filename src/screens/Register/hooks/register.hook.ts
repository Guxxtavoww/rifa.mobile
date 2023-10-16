import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';

import { useRedux } from '@/hooks';
import { useCustomToast } from '@/contexts/CustomToastContext';

import { RegisterFormType } from '../types/form.types';
import { registerUserAPI } from '../api/register.api';

export function useRegister() {
  const { toast } = useCustomToast();
  const { useAppSelector } = useRedux();
  const isLoading = useAppSelector((state) => state.auth.isFetchingUser);

  const mutation = useMutation({
    mutationFn: (userPayload: RegisterFormType) =>
      registerUserAPI(userPayload, toast),
  });

  const handleSubmit = useCallback(
    async (data: RegisterFormType) => {
      mutation.mutate(data);
    },
    [mutation]
  );

  return {
    handleSubmit,
    isLoading,
  };
}
