import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';

import { LoginFormType } from '../types/form.types';
import { loginUserAPI } from '../api/login.api';

export function useLogin() {
  const { mutate: loginMutation, isLoading } = useMutation({
    mutationFn: (userPayload: LoginFormType) => loginUserAPI(userPayload),
  });

  const handleSubmit = useCallback(async (data: LoginFormType) => {
    loginMutation(data);
  }, []);

  return {
    handleSubmit,
    isLoading,
  };
}
