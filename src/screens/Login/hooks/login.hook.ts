import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';

import { useRedux } from '@/hooks';
import { useCustomToast } from '@/contexts/CustomToastContext';

import { LoginFormType } from '../types/form.types';
import { loginUserAPI } from '../api/login.api';

export function useLogin() {
  const { toast } = useCustomToast();
  const isLoading = useRedux().useAppSelector(
    (state) => state.auth.isFetchingUser
  );

  const mutation = useMutation({
    mutationFn: (userPayload: LoginFormType) =>
      loginUserAPI(userPayload, toast),
  });

  const handleSubmit = useCallback(
    async (data: LoginFormType) => {
      mutation.mutate(data);
    },
    [toast]
  );

  return {
    handleSubmit,
    isLoading,
  };
}
