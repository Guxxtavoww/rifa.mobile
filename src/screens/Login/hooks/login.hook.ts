import { useCallback } from 'react';

import { useRedux } from '@/hooks';

import { LoginFormType } from '../types/form.types';

export function useLogin() {
  const authState = useRedux().useAppSelector((state) => state.auth);

  const handleSubmit = useCallback((data: LoginFormType) => {
    console.log({ data, authState });
  }, []);

  return {
    handleSubmit,
  };
}
