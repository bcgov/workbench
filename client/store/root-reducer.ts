/**
 * Root Reducer
 */
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import app from '@src/modules/app/reducer';
// import datasets from '@src/modules/datasets/reducer';
// import forums from '@src/modules/forums/reducer';
// import notebooks from '@src/modules/notebooks/reducer';
// import notifications from '@src/modules/notifications/reducer';
// import researchers from '@src/modules/researchers/reducer';
import search from '@src/modules/search/reducer';
import session from '@src/modules/session/reducer';
// Import Reducers
// Combine all reducers into one root reducer
const rootReducer = combineReducers({
  app,
  // datasets,
  // forums,
  // notebooks,
  // notifications,
  routing,
  search,
  session,
  // researchers,
});

export default rootReducer;
