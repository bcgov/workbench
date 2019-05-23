import first from 'lodash/first';
import once from 'lodash/once';
import {
  AUTHENTICATED,
  BOOTSTRAP,
  UNAUTHENTICATED,
  USERS,
  createUser,
} from '../actions';
import { getAuthToken, setAuthToken } from 'util/auth';

export default store => next => action => {
  next(action);

  if (action.type === USERS.SUCCESS) {
    const { email } = window.__USER__;
    const users = action.payload.result.map(
      id => action.payload.entities.users[id]
    );
    const signedInUser = users.find(user => user.email === email);

    if (signedInUser) {
      const authConfig = getAuthToken('discourse.auth');

      setAuthToken('discourse.auth', {
        ...authConfig,
        apiUsername: signedInUser.username,
      });

      next({
        type: AUTHENTICATED,
        payload: {
          username: signedInUser.username,
          id: signedInUser.id,
        },
      });
    } else {
      next(action);
      // Disable this for now
      // const password = Math.random()
      //   .toString(36)
      //   .substring(2);
      // const username = first(__USER__.email.split('@'));
      // store.dispatch(
      //   createUser({
      //     password,
      //     username,
      //   })
      // );
    }
  }
};
