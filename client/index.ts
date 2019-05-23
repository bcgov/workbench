/**
 * Client entry point
 */
import createHistory from 'history/createBrowserHistory';
import { render } from './create-app';
import { saveSession, getAuthTime } from '@src/services/session';

import configureStore from './store';
import App from './modules/app/containers/app';

// Initialize store
const initialState = {
  session: {
    ...window.__SESSION__,
    expired: false,
    lastAuthTime: getAuthTime(),
  },
};
const history = createHistory();
const store = configureStore(history, initialState);

saveSession(window.__SESSION__);
render(App, store, history);

if (module.hot) {
  module.hot.accept('./modules/app/containers/app', () => {
    render(require('./modules/app/containers/app').default, store, history);
  });
}
