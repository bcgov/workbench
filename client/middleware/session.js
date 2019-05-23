function createAuthMiddleware() {
  const { expires } = __SESSION__;

  return store => {
    let sessionInt = null;
    const checkSession = () => {
      if (expires * 1000 < Date.now()) {
        clearInterval(sessionInt);
        store.dispatch({
          type: 'SESSION_EXPIRED',
        });
      }
    };

    sessionInt = setInterval(checkSession, 10000);

    return next => action => {
      next(action);
    };
  };
}

export default createAuthMiddleware();
