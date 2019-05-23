import axios from 'axios';
import { stringify } from 'query-string';
import { camelizeKeys, decamelizeKeys } from 'humps';
import { normalize } from 'normalizr';
import { getAuthToken } from 'util/auth';

import { AUTH_LS_KEY } from '../constants';

const api = axios.create({
  baseURL: '/proxy/',
  paramsSerializer(params) {
    const formatted = decamelizeKeys(params);
    return stringify(formatted, { arrayFormat: 'bracket' });
  },
  responseType: 'json',
});

export function request(method = 'get', { url, query = {}, data, schema }) {
  const authParams = getAuthToken(AUTH_LS_KEY);

  return api({
    method,
    url,
    data: decamelizeKeys(data),
    params: {
      ...authParams,
      ...query,
    },
    transformResponse: [
      data => {
        if (data.errors) {
          return camelizeKeys(data);
        } else if (schema) {
          const formatted = camelizeKeys(data);
          return normalize(formatted, schema);
        } else {
          return data;
        }
      },
    ],
  })
    .then(res => res.data)
    .catch(err => {
      if (err.response) {
        return err.response.data;
      } else {
        return {
          errorType: 'server_failure',
          errors: ['Request Failed'],
        };
      }
    });
}

export function destroy(url) {
  const authParams = getAuthToken(AUTH_LS_KEY);
  return api({
    method: 'delete',
    url,
    params: authParams,
  });
}

export default api;
