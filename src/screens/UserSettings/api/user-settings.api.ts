import api from '@/api';
import { store } from '@/redux/store.redux';
import { signOut } from '@/utils/app.utils';
import { logOut, updateUser } from '@/redux/actions.redux';
import { ToastFuncType } from '@/contexts/CustomToastContext/custom-toast.types';

import { iUpdateUserResponse } from '../types/responses.types';
import { UpdatePayload } from '../types/form.types';

export const updateUserAPI = async (
  data: UpdatePayload,
  toast: ToastFuncType
) => {
  const userData = store.getState().auth.user_data!;

  return api
    .put<iUpdateUserResponse>('users', {
      user_photo_url: data.user_photo_url || undefined,
      user_id: userData.user_id,
      user_name: data.user_name,
      user_email: data.user_email
        ? data.user_email === userData.user_email
          ? null
          : data.user_email
        : null,
    })
    .then((res) => {
      store.dispatch(updateUser(res.data));

      toast('Usuario Editado com sucesso!');

      return Promise.resolve(res.data);
    })
    .catch((err) => {
      toast(err.message, {
        status: 'error',
      });

      return Promise.reject(err);
    });
};

export const deleteUserAPI = async (toast: ToastFuncType) => {
  const user_id = store.getState().auth.user_data!.user_id;

  return api
    .delete(`/users/${user_id}`)
    .then(() => {
      signOut();
      toast('Usuario Deletado com sucesso!');
    })
    .catch((err) => {
      toast(err.message, {
        status: 'error',
      });
    });
};
