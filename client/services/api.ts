import axios from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';
import has from 'lodash/has';
import pick from 'lodash/pick';
import { normalize, Schema } from 'normalizr';

import { getToken } from './session';

export const serialzeRequestData = (data: any) => decamelizeKeys(data);

export interface ApiConfig {
  baseURL?: string;
  data?: any;
  headers?: any;
  method: 'get' | 'post' | 'put' | 'delete';
  params?: any;
  schema?: Schema;
  url: string;
}

const defaultConfig: ApiConfig = {
  method: 'get',
  url: '',
};

function api(config: ApiConfig) {
  if (!has(config, 'url')) {
    throw new Error('The `url` property is required to make API requests');
  }

  const supportedRequestProps = pick(config, [
    'url',
    'data',
    'headers',
    'method',
    'params',
  ]);
  const token = getToken();
  const options = {
    ...defaultConfig,
    ...supportedRequestProps,
    headers: {
      Authorization: token,
    },
    transformRequest: [serialzeRequestData],
  };

  return axios(options).then((res: any) => {
    const json = camelizeKeys(res.data);
    if (config.schema) {
      return normalize(json, config.schema);
    }
    return json;
  });
}

export default api;
