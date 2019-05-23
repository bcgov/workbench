import axios from 'axios';
import { stringify } from 'querystring';
import { camelizeKeys, decamelizeKeys } from 'humps';
import { normalize } from 'normalizr';
import { call, put } from 'redux-saga/effects';

export function* fetchEntity(action) {
  const { REQUESTED, SUCCESS, FAILED } = action.payload.types;

  yield put({ type: REQUESTED });

  try {
    const payload = yield call(request, 'get', action.payload);
    yield put({
      type: SUCCESS,
      payload,
      meta: action.meta,
    });
  } catch (e) {
    yield put({
      type: FAILED,
      payload: e,
    });
  }
}

export function request(
  method = 'get',
  { baseURL, url, query = {}, data, schema }
) {
  return axios({
    method,
    baseURL: baseURL || '/api/',
    url,
    data: decamelizeKeys(data),
    responseType: 'json',
    headers: {
      Authorization: `Bearer ${__USER__.accessToken}`,
      'Content-Type': 'application/json',
    },
    params: {
      ...query,
    },
    transformResponse: [
      data => {
        const parsed = JSON.parse(data);
        const formatted = camelizeKeys(parsed, (key, convert, options) => {
          return !schema ? key : convert(key);
        });
        return schema ? normalize(formatted, schema) : formatted;
      },
    ],
  }).then(res => res.data);
}

export default request;
