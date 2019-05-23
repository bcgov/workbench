import { all, fork } from 'redux-saga/effects';

import appSagas from '@src/modules/app/sagas';
// import datasetSagas from './modules/datasets/sagas';
// import forumSagas from './modules/forums/sagas';
// import notebookSagas from './modules/notebooks/sagas';
// import searchSagas from './modules/search/sagas';
import sessionSagas from '@src/modules/session/sagas';

export default function* root() {
  yield all([
    fork(appSagas),
    // fork(datasetSagas),
    // fork(forumSagas),
    // fork(notebookSagas),
    // fork(searchSagas),
    fork(sessionSagas),
  ]);
}
