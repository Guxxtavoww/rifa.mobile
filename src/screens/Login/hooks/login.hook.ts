import { useCallback } from 'react';

import { useRedux } from '@/hooks';
import { useCustomToast } from '@/contexts/CustomToastContext';

import { LoginFormType } from '../types/form.types';

export function useLogin() {
  const { toast } = useCustomToast();
  const authState = useRedux().useAppSelector((state) => state.auth);

  const handleSubmit = useCallback(
    (data: LoginFormType) => {
      console.log({ data, authState });
      toast('Logado com sucesso!');
    },
    [toast]
  );

  return {
    handleSubmit,
  };
}
