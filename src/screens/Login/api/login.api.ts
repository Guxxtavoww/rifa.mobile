import { validateApiCall } from '@/utils/validate-api-call.util';
import { authRequestSchema } from '@/redux/slices/auth/auth.types';
import { login, loginStart, loginError } from '@/redux/actions.redux';
import { store } from '@/redux/store.redux';
import { toast } from '@/utils/app.utils';

import { LoginFormType } from '../types/form.types';

export const loginUserAPI = async (
  data: LoginFormType,
) => {
  const dispatch = store.dispatch;

  dispatch(loginStart());

  return validateApiCall({
    endpoint: '/auth/login',
    zodSchema: authRequestSchema,
    method: 'POST',
    body: data,
  })
    .then((response) => {
      dispatch(login(response));
      toast('Logado com sucesso!', {
        status: 'sucess',
      });

      return Promise.resolve(response);
    })
    .catch(() => {
      dispatch(loginError());
    });
};
