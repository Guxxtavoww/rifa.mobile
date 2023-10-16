import { useCallback } from 'react';

import { useRedux } from '@/hooks';
import { login } from '@/redux/actions.redux';
import { useCustomToast } from '@/contexts/CustomToastContext';

import { LoginFormType } from '../types/form.types';

export function useLogin() {
  const { toast } = useCustomToast();
  const appDispatch = useRedux().useAppDispatch();

  const handleSubmit = useCallback(
    (data: LoginFormType) => {
      appDispatch(
        login({
          access_token: 'fodase',
          user_data: {
            created_at: '',
            funds: 0,
            updated_at: null,
            user_email: 'dsadas',
            user_id: '23123213213',
            user_name: 'Fodase',
            user_photo_url: null,
          },
        })
      );
      toast('Logado com sucesso!');
    },
    [toast]
  );

  return {
    handleSubmit,
  };
}
