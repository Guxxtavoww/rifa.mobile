import api from '@/api/api';
import { store } from '@/redux/store.redux';
import { updateUser } from '@/redux/actions.redux';

import { iUpdateUserResponse } from '../types/responses.types';
import { EditUserFormType } from '../types/form.types';

export const updateUserAPI = async (
  data: EditUserFormType & { user_photo_url?: string }
) => {
  const userData = store.getState().auth.user_data!;

  return api
    .put<iUpdateUserResponse>('users', {
      user_photo_url: data.user_photo_url,
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

      return Promise.resolve(res.data);
    });
};
