import { CustomToastContextProps } from '@/contexts/CustomToastContext/custom-toast.types';
import { validateApiCall } from '@/utils/validate-api-call.util';
import { authRequestSchema } from '@/redux/slices/auth/auth.types';
import { login, loginStart, loginError } from '@/redux/actions.redux';
import { store } from '@/redux/store.redux';

import { RegisterFormType } from '../types/form.types';

export const registerUserAPI = async (
  data: RegisterFormType,
  toast: CustomToastContextProps['toast']
) => {
  const dispatch = store.dispatch;

  dispatch(loginStart());

  return validateApiCall({
    endpoint: '/auth/register',
    zodSchema: authRequestSchema,
    method: 'POST',
    body: {
      user_name: data.user_name,
      user_email: data.user_email,
      user_password: data.user_password,
    },
  })
    .then((response) => {
      dispatch(login(response));
      toast('Logado e cadastrado com sucesso!', {
        status: 'sucess',
      });

      return Promise.resolve();
    })
    .catch((err) => {
      dispatch(loginError());
      toast(err.message, {
        status: 'error',
      });
    });
};
