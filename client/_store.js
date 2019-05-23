/**
 * Main store function
 */
import { createStore, applyMiddleware, compose } from 'redux';
import { routerReducer, routerMiddleware, push } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

// Middleware, reducers and sagas
import redirectMiddleware from './middleware/redirect';
import rootReducer from './reducers';
import sagas from './sagas';
import createSearchMiddleware from './middleware/search';
// import authMiddleware from './modules/forums/middleware/auth';
import createDiscourseMiddleware from './modules/forums/middleware/discourse';
// import sessionMiddleware from './middleware/session';
// import analyticsMiddleware from './middleware/analytics';

export function configureStore(session, history) {
  const sagaMiddleware = createSagaMiddleware();
  const devTool = window.devToolsExtension
    ? window.devToolsExtension()
    : f => f;
  const discourseMiddleware = createDiscourseMiddleware();
  const enhancers = [devTool];
  const middleware = [
    thunkMiddleware,
    routerMiddleware(history),
    sagaMiddleware,
    redirectMiddleware,
    // authMiddleware,
    createSearchMiddleware(),
    discourseMiddleware,
    // sessionMiddleware,
  ];

  if (process.env.CLIENT && process.env.NODE_ENV === 'development') {
    // Enable DevTools only when rendering on client and during development.
    // enhancers.push();
    middleware.push(createLogger());
  } else if (process.env.NODE_ENV === 'production') {
    // middleware.push(analyticsMiddleware);
  }

  const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
  );

  const store = createStore(
    rootReducer,
    { session: { ...session, expired: false } },
    composedEnhancers
  );

  sagaMiddleware.run(sagas);
  store.dispatch({ type: 'app/init' });

  // For hot reloading reducers
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
