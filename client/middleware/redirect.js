// Intercept actions that need to respond to a API response by redirecting
import { push } from 'react-router-redux';
import nth from 'lodash/nth';
import split from 'lodash/split';

import {
  NEW_TOPIC,
  DELETE_TOPIC,
} from '../modules/forums/actions';

export default store => next => action => {
  const { routing } = store.getState();
  const routes = routing.location ? split(routing.location.pathname, '/') : [];
  const projectID = nth(routes, 1);
  next(action);

  if (projectID) {
    switch (action.type) {
    case NEW_TOPIC.SUCCESS:
      const topicId = action.payload.entities.posts[action.payload.result].topicId;
      store.dispatch(push(`/${projectID}/discussions/${topicId}`));
      break;

    case DELETE_TOPIC.SUCCESS:
      store.dispatch(push(`/${projectID}/discussions`));
      break;
    }
  }
};
