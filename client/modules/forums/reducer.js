import get from 'lodash/get';
import has from 'lodash/has';
import isArray from 'lodash/isArray';
import merge from 'lodash/merge';
import mergeWith from 'lodash/mergeWith';
import union from 'lodash/union';
import unset from 'lodash/unset';
import omit from 'lodash/omit';
import uniq from 'lodash/uniq';
import { combineReducers } from 'redux';
import {
  AUTHENTICATED,
  UNAUTHENTICATED,
  BOOTSTRAP,
  LATEST,
  CATEGORY,
  CATEGORIES,
  TOPIC,
  FORUM_PROJECT_SET,
  FORUM_DISCUSSION_TOGGLED,
  POST_CONTENT_UPDATED,
  NEW_POST,
  POST,
  POSTS,
  POST_DELETE,
  POST_DELETED,
  POST_EDIT,
  POST_EDIT_CANCELLED,
  POST_SAVE,
  ANNOUNCEMENTS,
  FORUMS_SEARCH,
  SEARCH,
  NEW_CATEGORY,
  NEW_TOPIC,
  DELETE_TOPIC,
  UNREAD_NOTIFICATION_RECEIVED,
  USERS,
  NEW_USER,
  NEW_USER_CLEAR,
} from './actions';

const initialForumState = {
  userStatus: 'pending', // Can be either `pending`, `loading`, `failed`, `authenticated` or `new`
  newUserErrors: {},
  isBooted: false,
  openSidebarItemIds: [],
  unreadIds: [],
  editing: null,
  // Store the parent project category here so
  projectCategory: null,
};

function viewState(state = initialForumState, action = {}) {
  switch (action.type) {
    case USERS.REQUESTED:
      return {
        ...state,
        userStatus: 'loading',
      };

    case NEW_USER.REQUESTED:
      return {
        ...state,
        userStatus: 'requesting',
        newUserErrors: {},
      };

    case NEW_USER_CLEAR:
      return {
        ...state,
        userStatus: 'pending',
        newUserErrors: {},
      };

    case NEW_USER.SUCCESS:
    case AUTHENTICATED:
      return {
        ...state,
        userStatus: 'authenticated',
        newUserErrors: {},
      };

    case NEW_USER.FAILED:
      return {
        ...state,
        userStatus: 'failed',
        newUserErrors: action.payload,
      };

    case UNAUTHENTICATED:
      return {
        ...state,
        userStatus: 'new',
      };

    case BOOTSTRAP.SUCCESS:
      return {
        ...state,
        isBooted: true,
      };

    case FORUM_PROJECT_SET:
      return {
        ...state,
        projectCategory: action.payload.category,
      };

    case FORUM_DISCUSSION_TOGGLED:
      return {
        ...state,
        openSidebarItemIds: state.openSidebarItemIds.includes(action.payload.id)
          ? state.openSidebarItemIds.filter(id => id !== action.payload.id)
          : [...state.openSidebarItemIds, action.payload.id],
      };

    case UNREAD_NOTIFICATION_RECEIVED:
      return {
        ...state,
        unreadIds: union(state.unreadIds, [action.payload.topicId]),
      };

    case TOPIC.SUCCESS:
      return {
        ...state,
        unreadIds: state.unreadIds.filter(
          id => id.toString() !== action.meta.topicId
        ),
      };

    case POST_EDIT:
    case POST_SAVE.FAILED:
      return {
        ...state,
        editing: action.payload.postId || action.meta.postId,
      };

    case POST_SAVE.REQUESTED:
    case POST_EDIT_CANCELLED:
      return {
        ...state,
        editing: null,
      };

    default:
      return state;
  }
}

const initialState = {
  fetchStatus: {},
  entities: {},
};

function latest(state = initialState, action = {}) {
  switch (action.type) {
    case LATEST.SUCCESS:
      return {
        entities: {
          ...state.entities,
          ...action.payload.entities.topics,
        },
      };

    default:
      return state;
  }
}

function categories(state = initialState, action = {}) {
  switch (action.type) {
    case BOOTSTRAP.SUCCESS:
    case CATEGORIES.SUCCESS:
    case SEARCH.SUCCESS:
      return {
        ...state,
        entities: merge({}, state.entities, action.payload.entities.categories),
      };

    case NEW_CATEGORY.SUCCESS:
      return {
        ...state,
        entities: merge(
          {},
          state.entities,
          action.payload.entities.categories,
          {
            [10]: {
              subcategoryIds: union(state.entities['10'].subcategoryIds, [
                action.payload.result.category,
              ]),
            },
          }
        ),
      };

    default:
      return state;
  }
}

function topicMergeStrategy(objectValue, srcValue) {
  if (isArray(objectValue)) {
    return uniq(objectValue.concat(srcValue));
  }
}

function topics(state = initialState, action = {}) {
  switch (action.type) {
    case ANNOUNCEMENTS.SUCCESS:
    case CATEGORY.SUCCESS:
      return {
        ...state,
        // TODO: Add missing fetchStatus for an array
        entities: merge({}, state.entities, action.payload.entities.topics),
      };

    case TOPIC.REQUESTED:
      return {
        ...state,
        fetchStatus: {
          ...state.fetchStatus,
          [action.meta.topicId]: 'loading',
        },
      };

    case TOPIC.SUCCESS:
    case SEARCH.SUCCESS:
      return {
        ...state,
        fetchStatus: {
          ...state.fetchStatus,
          [action.meta.topicId]: 'loaded',
        },
        entities: merge({}, state.entities, action.payload.entities.topics),
      };

    case NEW_CATEGORY.SUCCESS:
      return {
        ...state,
        entities: merge({}, state.entities, action.payload.entities.topics),
      };

    case POST.SUCCESS:
      const postId = action.payload.result;
      const post = get(action, ['payload', 'entities', 'posts', postId]);
      const topicId = get(post, 'topicId');
      const streamIndex = get(post, 'postNumber', 0);
      const stream = [...state.entities[topicId].stream];
      stream.splice(streamIndex - 1, 0, action.payload.result);

      return {
        ...state,
        entities: {
          ...state.entities,
          [topicId]: {
            ...state.entities[topicId],
            posts: union(state.entities[topicId].posts, [
              action.payload.result,
            ]),
            stream: uniq(stream),
          },
        },
      };

    case NEW_POST.SUCCESS:
      return {
        ...state,
        entities: mergeWith(
          {},
          state.entities,
          {
            [action.meta.topicId]: {
              posts: [
                ...state.entities[action.meta.topicId].posts,
                action.payload.result,
              ],
              stream: [action.payload.result],
              postsCount: state.entities[action.meta.topicId].postsCount + 1,
            },
          },
          topicMergeStrategy
        ),
      };

    case POSTS.SUCCESS:
      return {
        ...state,
        entities: mergeWith(
          {},
          state.entities,
          action.payload.entities.topics,
          topicMergeStrategy
        ),
      };

    case POST_DELETED:
    case POST_DELETE.SUCCESS:
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.meta.topicId]: {
            ...state.entities[action.meta.topicId],
            stream: state.entities[action.meta.topicId].stream.filter(
              id => id !== action.meta.postId
            ),
          },
        },
      };

    case DELETE_TOPIC.SUCCESS:
      return {
        ...state,
        entities: unset({ ...state.entities }, action.payload.id),
      };

    default:
      return state;
  }
}

const intitialNewTopicState = {
  postStatus: 'new', // 'new', 'posting' or 'failed'
  errors: null,
};

function newTopic(state = intitialNewTopicState, action = {}) {
  switch (action.type) {
    case NEW_TOPIC.REQUESTED:
      return {
        ...state,
        postStatus: 'posting',
        errors: null,
      };

    case NEW_TOPIC.SUCCESS:
      return {
        ...state,
        postStatus: 'new',
        errors: null,
      };

    case NEW_TOPIC.FAILED:
      return {
        ...state,
        postStatus: 'failed',
        errors: action.payload.errors,
      };

    default:
      return state;
  }
}

function posts(state = initialState, action = {}) {
  switch (action.type) {
    case POST.REQUESTED:
      return {
        ...state,
        fetchStatus: {
          ...state.fetchStatus,
          [action.meta.postId]: state.fetchStatus[action.meta.postId]
            ? 'updating'
            : 'loading',
        },
      };

    case POST_SAVE.REQUESTED:
      return {
        ...state,
        fetchStatus: {
          ...state.fetchStatus,
          [action.meta.postId]: 'updating',
        },
      };

    case NEW_TOPIC.SUCCESS:
    case NEW_POST.SUCCESS:
    case SEARCH.SUCCESS:
    case POST.SUCCESS:
    case POST_SAVE.SUCCESS:
      return {
        ...state,
        fetchStatus: {
          ...state.fetchStatus,
          [action.payload.result]: 'loaded',
        },
        entities: merge({}, state.entities, action.payload.entities.posts),
      };

    case POSTS.REQUESTED:
      const ids = has(action, 'payload.query.postIds')
        ? action.payload.query.postIds.reduce(
            (prev, id) => ({ ...prev, [id]: 'loading' }),
            {}
          )
        : [];
      return {
        ...state,
        fetchStatus: {
          ...state.fetchStatus,
          ...ids,
        },
      };

    case POSTS.SUCCESS:
      return {
        ...state,
        fetchStatus: action.payload.entities.topics[
          action.payload.result
        ].stream.reduce((prev, id) => {
          return {
            ...prev,
            [id]: 'loaded',
          };
        }, state.fetchStatus),
        entities: merge({}, state.entities, action.payload.entities.posts),
      };

    case TOPIC.SUCCESS:
      return {
        ...state,
        fetchStatus: action.payload.entities.topics[
          action.payload.result
        ].stream.reduce((prev, id) => {
          return {
            ...prev,
            [id]: action.payload.entities.posts[id] ? 'loaded' : null,
          };
        }, state.fetchStatus),
        entities: merge({}, state.entities, action.payload.entities.posts),
      };

    case POST_DELETE.REQUESTED:
      return {
        ...state,
        fetchStatus: {
          ...state.fetchStatus,
          [action.meta.postId]: 'deleted',
        },
      };

    case POST_DELETED:
    case POST_DELETE.SUCCESS:
      return {
        ...state,
        fetchStatus: {
          ...state.fetchStatus,
          [action.meta.postId]: 'deleted',
        },
        entities: omit(state.entities, action.meta.postId),
      };

    default:
      return state;
  }
}

const initialNewPostState = {
  content: '',
  draft: '',
  postStatus: 'none',
  errors: null,
};

function newPost(state = initialNewPostState, action = {}) {
  switch (action.type) {
    case POST_CONTENT_UPDATED:
      return {
        ...state,
        content: action.payload.value,
      };

    case NEW_POST.REQUESTED:
      return {
        ...state,
        errors: null,
        postStatus: 'posting',
      };

    case NEW_POST.SUCCESS:
      return {
        ...state,
        content: '',
        postStatus: 'none',
      };

    case NEW_POST.FAILED:
      return {
        ...state,
        postStatus: 'failed',
        errors: action.payload.errors,
      };

    default:
      return state;
  }
}

export default combineReducers({
  viewState,
  categories,
  latest,
  posts,
  topics,
  newTopic,
  newPost,
});
