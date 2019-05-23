import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { History } from 'history';
import { Store } from 'redux';

require('react-virtualized/styles.css');

const mountApp = document.getElementById('root');

export function render(
  Root: typeof React.Component,
  store: Store,
  history: History
) {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Root />
      </ConnectedRouter>
    </Provider>,
    mountApp
  );
}
