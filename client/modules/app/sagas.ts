import api from '@src/services/api';
import { call, put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { getType } from 'typesafe-actions';

import * as actions from './actions';
import { AppActions } from './reducer';

function* fetchUser(action: AppActions) {
  yield put(actions.fetchUserAsync.request());

  try {
    const payload = yield call(api, {
      url: '/user',
      method: 'get',
    });
    yield call(delay, 3000);
    yield put(actions.fetchUserAsync.success(payload));
  } catch (err) {
    yield put(actions.fetchUserAsync.failure(Error(err)));
  }
}

function* sagas() {
  yield takeLatest(getType(actions.fetchUser), fetchUser);
}

export default sagas;
