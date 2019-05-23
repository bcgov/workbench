import { call, put, takeLatest } from 'redux-saga/effects';

import { FETCH_NOTEBOOKS, NOTEBOOKS } from './actions';
import { request } from './util/api';

function* fetchNotebooks(action) {
  put({ type: NOTEBOOKS.REQUESTED });

  try {
    const payload = yield call(request, 'get', action.payload);

    yield put({
      type: NOTEBOOKS.SUCCESS,
      payload
    });
  } catch(e) {
    yield put({
      type: NOTEBOOKS.FAILED,
      error: true,
      payload: e,
    });
  }
}

function* sagas() {
  yield takeLatest(FETCH_NOTEBOOKS, fetchNotebooks);
}

export default sagas;
