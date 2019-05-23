import { call, fork, put, takeLatest } from 'redux-saga/effects';

import { AUTH_LS_KEY } from './constants';
import { setAuthUsername } from 'util/auth';
import { request, destroy } from './util/api';

import {
  FORUMS_BOOTSTRAP,
  FORUMS_GET_LATEST,
  FORUMS_GET_CATEGORIES,
  FORUMS_GET_CATEGORY,
  FORUMS_GET_TOPIC,
  FORUMS_GET_POSTS,
  FORUMS_GET_POST,
  FORUMS_USERS,
  NEW_POST_CREATE,
  NEW_USER_CREATE,
  FORUMS_SAVE_POST,
  FORUMS_DELETE_POST,
  FORUMS_GET_ANNOUNCEMENTS,
  FORUMS_SEARCH,
  FORUMS_CATEGORY_CREATE,
  FORUMS_NEW_TOPIC,
  FORUMS_DELETE_TOPIC,
} from './actions';

function* fetchEntity(action) {
  const { REQUESTED, SUCCESS, FAILED } = action.payload.types;
  yield put({ type: REQUESTED, meta: action.meta });
  const payload = yield call(request, 'get', action.payload);

  if (payload.errors) {
    yield put({ type: FAILED, payload: payload.errors });
  } else {
    yield put({ type: SUCCESS, meta: action.meta, payload });
  }
}

// Create user needs to save to local utils after it succeeds, so we'll make a separate saga for it.
function* createUser(action) {
  const { REQUESTED, SUCCESS, FAILED } = action.payload.types;
  yield put({ type: REQUESTED });
  const payload = yield call(request, 'post', action.payload);

  if (payload.errors) {
    yield put({ type: FAILED, payload });
  } else {
    setAuthUsername(AUTH_LS_KEY, action.payload.data.username);
    yield put({ type: SUCCESS, payload, meta: action.meta });
  }
}

function* postEntity(action) {
  const { REQUESTED, SUCCESS, FAILED } = action.payload.types;
  yield put({ type: REQUESTED });
  const payload = yield call(request, 'post', action.payload);

  if (payload.errors) {
    yield put({ type: FAILED, payload });
  } else {
    yield put({ type: SUCCESS, payload, meta: action.meta });
  }
}

function* putEntity(action) {
  const { REQUESTED, SUCCESS, FAILED } = action.payload.types;
  yield put({ type: REQUESTED, meta: action.meta });
  const payload = yield call(request, 'put', action.payload);

  if (payload.errors) {
    yield put({ type: FAILED, meta: action.meta, payload });
  } else {
    yield put({ type: SUCCESS, payload, meta: action.meta });
  }
}

function* deleteEntity(action) {
  const { REQUESTED, SUCCESS, FAILED } = action.payload.types;
  yield put({ type: REQUESTED, meta: action.meta, payload: action.payload });
  const payload = yield call(destroy, action.payload.url);

  if (payload.errors) {
    yield put({ type: FAILED, meta: action.meta, payload });
  } else {
    yield put({ type: SUCCESS, meta: action.meta, payload: action.payload });
  }
}

function* sagas() {
  yield takeLatest(FORUMS_BOOTSTRAP, fetchEntity);
  yield takeLatest(FORUMS_USERS, fetchEntity);
  yield takeLatest(FORUMS_GET_LATEST, fetchEntity);
  yield takeLatest(FORUMS_GET_CATEGORY, fetchEntity);
  yield takeLatest(FORUMS_GET_CATEGORIES, fetchEntity);
  yield takeLatest(FORUMS_GET_TOPIC, fetchEntity);
  yield takeLatest(FORUMS_GET_POSTS, fetchEntity);
  yield takeLatest(FORUMS_GET_POST, fetchEntity);
  yield takeLatest(NEW_POST_CREATE, postEntity);
  yield takeLatest(FORUMS_GET_ANNOUNCEMENTS, fetchEntity);
  yield takeLatest(FORUMS_SEARCH, fetchEntity);
  yield takeLatest(FORUMS_CATEGORY_CREATE, postEntity);
  yield takeLatest(FORUMS_NEW_TOPIC, postEntity);
  yield takeLatest(NEW_USER_CREATE, createUser);
  yield takeLatest(FORUMS_DELETE_TOPIC, deleteEntity);
  yield takeLatest(FORUMS_DELETE_POST, deleteEntity);
  yield takeLatest(FORUMS_SAVE_POST, putEntity);
}

export default sagas;
