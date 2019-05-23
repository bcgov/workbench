import MessageBus from '../util/message-bus';
import { camelizeKeys } from 'humps';
import {
  AUTHENTICATED,
  BOOTSTRAP,
  FORUMS_GET_TOPIC,
  FORUMS_GET_POST,
  FORUM_PROJECT_SET,
  FORUM_SUBSCRIBED,
  FORUM_UNSUBSCRIBED,
  NEW_USER,
  fetchPost,
  fetchUsers,
  updateUnread,
  deletePostReference,
} from '../actions';

// Prevent doubling up the subscriptions
function subscribe(url, callback) {
  MessageBus.unsubscribe(url, callback);
  MessageBus.subscribe(url, data => callback(camelizeKeys(data)));
}

function topicMessageHandler(store, topicId, data) {
  switch (data.type) {
    case 'deleted':
      store.dispatch(deletePostReference(data.id, topicId));
      break;
    case 'revised':
    case 'recovered':
    case 'created':
      store.dispatch(fetchPost(data.id));
      break;
    default:
  }
}

function makeDiscourseMiddleware() {
  MessageBus.baseUrl = '/proxy/';
  MessageBus.callbackInterval = 3000;
  MessageBus.start();

  return store => next => action => {
    switch (action.type) {
      case BOOTSTRAP.SUCCESS:
        const projectId = store
          .getState()
          .routing.location.pathname.split('/')[1];
        const categories = action.payload.result.categories.map(
          id => action.payload.entities.categories[id]
        );
        const category = categories.find(
          cat => cat.slug.replace(/-/g, '_') === projectId
        );

        store.dispatch({
          type: FORUM_PROJECT_SET,
          payload: {
            category,
          },
        });
        break;

      case FORUMS_GET_TOPIC:
        subscribe(
          `/topic/${action.meta.topicId}`,
          topicMessageHandler.bind(null, store, action.meta.topicId)
        );
        break;

      case NEW_USER.SUCCESS:
        store.dispatch(fetchUsers());
        break;

      case FORUM_UNSUBSCRIBED:
        MessageBus.unsubscribe(action.payload.url);
        break;

      case AUTHENTICATED:
        subscribe(`/unread/${action.payload.id}`, data =>
          store.dispatch(updateUnread(data.payload))
        );
        break;
    }

    next(action);
  };
}

export default makeDiscourseMiddleware;
