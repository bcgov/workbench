import api from '@src/services/api';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import * as actions from './actions';
import { SearchActions } from './reducer';

function* fetchSearch(action: SearchActions) {
  yield put(actions.fetchSearchAsync.request());

  try {
    const payload = yield call(api, {
      url: `/search/query.json`,
      method: 'get',
      params: {
        term: action.payload,
        includeBlurbs: true,
      },
    });
    yield put(actions.fetchSearchAsync.success(payload));
  } catch (err) {
    yield put(actions.fetchSearchAsync.failure(Error(err)));
  }
}

function* sagas() {
  yield takeEvery(getType(actions.fetchSearch), fetchSearch);
}

export default sagas;
