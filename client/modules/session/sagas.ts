import { call, put, take, takeLatest, select } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import isBefore from 'date-fns/isBefore';
import Types from 'Types';

// This is a channel that runs every minute to test the time against the session expiry
function loginChannel(expiry: Date) {
  return eventChannel(emitter => {
    const interval = setInterval(() => {
      if (isBefore(Date.now(), expiry)) {
        emitter({
          expiry,
        });
      } else {
        // this causes the channel to close
        emitter(END);
      }
    }, 60000);
    // The subscriber must return an unsubscribe function
    return () => {
      clearInterval(interval);
    };
  });
}

function* monitorSession() {
  const { expires } = yield select((state: Types.RootState) => state.session);
  const expiryDate = new Date(expires * 1000);

  const channel = yield call(loginChannel, expiryDate);

  // Keep the channel alive while the session is. Send a termination event when it ends
  try {
    while (true) {
      yield take(channel);
    }
  } finally {
    yield put({
      type: 'session/destroy',
    });
  }
}

export default function* root() {
  yield takeLatest('app/init', monitorSession);
}
