import axios from 'axios';

import { store } from '@/redux/store.redux';
import { ENV_VARIABLES } from '@/config/env.config';

const api = axios.create({
  baseURL: ENV_VARIABLES.EXPO_BASE_API_URL,
});

api.interceptors.request.use(
  (req) => {
    const access_token = store.getState().auth.access_token;

    if (access_token) {
      req.headers.Authorization = `Bearer ${access_token}`;
    }

    return Promise.resolve(req);
  },
  (error) => {}
);

export default api;
