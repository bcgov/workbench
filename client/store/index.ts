import { applyMiddleware, createStore, compose, Store } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { History } from 'history';

import rootReducer from './root-reducer';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

function configureStore(history: History, initialState?: object): Store {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middleware = [routerMiddleware(history), sagaMiddleware];

  if (process.env.NODE_ENV === 'development') {
    // enhancers.push(devTool);
    middleware.push(createLogger());
  } else if (process.env.NODE_ENV === 'production') {
    // TODO: Get when there is analytics available add it to production middleware
    // middleware.push(analyticsMiddleware);
  }

  const composedEnhancers = composeEnhancers(applyMiddleware(...middleware));
  const store = createStore(rootReducer, initialState!, composedEnhancers);

  sagaMiddleware.run(rootSaga);

  if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
      module.hot.accept('./root-reducer', () =>
        store.replaceReducer(require('./root-reducer').default)
      );
      // TODO: Try experimenting with hot reloaded sagas, see https://gist.github.com/markerikson/dc6cee36b5b6f8d718f2e24a249e0491#file-sagamanager-js
    }
  }

  console.info('-----------------------------');
  console.info(`IDO WORKBENCH VERSION ${VERSION}`);
  console.info('-----------------------------');

  return store;
}

export default configureStore;
