import axios, { AxiosError } from 'axios';

import { store } from '@/redux/store.redux';
import { signOut, toast } from '@/utils/app.utils';
import { ENV_VARIABLES } from '@/config/env.config';

const api = axios.create({
  baseURL: ENV_VARIABLES.EXPO_BASE_API_URL,
});

function handleErrorStatus(
  error: AxiosError<{ message: string; status: number }>
) {
  if (error.status !== 401) {
    toast(error.response?.data.message || 'Erro', {
      status: 'error',
    });

    return Promise.reject(error.response?.data);
  }

  signOut(true);
  return Promise.reject();
}

api.interceptors.request.use(
  (req) => {
    const access_token = store.getState().auth.access_token;

    if (access_token) {
      req.headers.Authorization = `Bearer ${access_token}`;
    }

    return Promise.resolve(req);
  },
  (error: AxiosError<{ message: string; status: number }>) => {
    return handleErrorStatus(error);
  }
);

api.interceptors.response.use(
  (res) => {
    console.info(res.config.method);
    console.info(res.config.url + ':');
    console.info(JSON.stringify(res.data, null, 2));

    return Promise.resolve(res);
  },
  (error) => {
    console.info(error.config.method);
    console.info(error.config.url + ':');
    console.info(JSON.stringify(error.response.data, null, 2));

    return handleErrorStatus(error);
  }
);

export default api;
