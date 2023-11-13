import api from '@/api';
import { toast } from '@/utils/app.utils';
import { store } from '@/redux/store.redux';
import { updateUser } from '@/redux/actions.redux';
import { uploadImageAsync } from '@/utils/upload-image-async.util';
import { iUpdateUserResponse } from '@/redux/slices/auth/auth.types';

export const updateUserPhotoAPI = async (photoUri: string) => {
  try {
    const user_photo_url = await uploadImageAsync(photoUri).catch(() => {
      throw 'Falha ao enviar a foto';
    });

    const user_id = store.getState().auth.user_data!.user_id;

    return api
      .put<iUpdateUserResponse>('users', { user_photo_url, user_id })
      .then(({ data }) => {
        toast('Foto atualiazada com sucesso!');

        store.dispatch(updateUser(data));

        return Promise.resolve(data);
      });
  } catch (error) {
    toast(String(error), {
      status: 'error',
    });

    return Promise.reject(error);
  }
};
