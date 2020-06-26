import axios from 'axios';
import { rest } from './constants';

const restApi = axios.create({
  baseURL: rest.baseURL,
  headers: {
    'Content-Type': 'application/json',
    'X-Application-Key': rest.appKey,
  },
});

let privateToken = 'no-token';

function registerToken(token: string) {
  privateToken = token;
  restApi.interceptors.request.use(
    config => {
      config.headers.Authorization = `Bearer ${privateToken}`;
      return config;
    },
    error => Promise.reject(error),
  );
}

export { restApi, registerToken };
