import axios, { AxiosError } from 'axios';

import { store } from '@/redux/store.redux';
import { logOut } from '@/redux/actions.redux';
import { ENV_VARIABLES } from '@/config/env.config';

const api = axios.create({
  baseURL: ENV_VARIABLES.EXPO_BASE_API_URL,
});

function handleErrorStatus(error: AxiosError) {
  if (error.status !== 401) {
    return Promise.reject(error.response?.data);
  }

  store.dispatch(logOut());
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
  (error: AxiosError) => {
    return handleErrorStatus(error);
  }
);

api.interceptors.response.use(
  (res) => {
    console.info(res.config.url + ':');
    console.info(JSON.stringify(res.data, null, 2));

    return Promise.resolve(res);
  },
  (error) => {
    console.error(JSON.stringify(error.response, null, 2));
    return handleErrorStatus(error);
  }
);

export default api;
