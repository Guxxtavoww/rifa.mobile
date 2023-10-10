import { useCallback } from 'react';

import { LoginFormType } from '../types/form.types';

export function useLogin() {
  const handleSubmit = useCallback((data: LoginFormType) => {
    console.log(data);
  }, []);

  return {
    handleSubmit,
  };
}
