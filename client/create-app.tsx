import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { createHashHistory } from 'history';
import { Store } from 'redux';

require('react-virtualized/styles.css');

const mountApp = document.getElementById('root');

const history = createHashHistory()

export function render(
  Root: typeof React.Component,
  store: Store
) {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Root/>
      </ConnectedRouter>
    </Provider>,
    mountApp
  );
}
