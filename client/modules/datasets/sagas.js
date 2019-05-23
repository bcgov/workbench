import { takeLatest } from 'redux-saga/effects';

import { fetchEntity } from 'util/api';
import { LOAD_SAMPLES } from './actions';

function* sagas() {
  yield takeLatest(LOAD_SAMPLES, fetchEntity);
}

export default sagas;
