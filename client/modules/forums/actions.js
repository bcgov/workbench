import { createRequestActionTypes } from 'util/actions';
import {
  bootstrap,
  latest,
  category,
  categories,
  topics,
  topic,
  post,
  users,
  search,
} from './schemas';

export const AUTHENTICATED = 'forums/authenticated';
export const UNAUTHENTICATED = 'forums/unauthenticated';

// Bootstrap
export const FORUMS_BOOTSTRAP = 'forums/get/site';
export const FORUM_PROJECT_SET = 'FORUM_PROJECT_SET';
export const BOOTSTRAP = createRequestActionTypes('BOOTSTRAP');

export const fetchBootstrap = () => {
  return {
    type: FORUMS_BOOTSTRAP,
    payload: {
      url: 'site.json',
      schema: bootstrap,
      types: BOOTSTRAP,
      query: {
        apiUsername: 'system',
      },
    },
  };
};

// Get all the users so we can determine the username
export const FORUMS_USERS = 'forums/get/users';
export const USERS = createRequestActionTypes('USERS');

export const fetchUsers = (filter = 'active') => ({
  type: FORUMS_USERS,
  payload: {
    url: `admin/users/list/${filter}.json`,
    query: {
      apiUsername: 'system',
      showEmails: true,
    },
    schema: users,
    types: USERS,
  },
});

// Search
export const FORUMS_SEARCH = 'forums/get/search';
export const SEARCH = createRequestActionTypes('SEARCH');

export const fetchSearch = term => {
  return {
    type: FORUMS_SEARCH,
    meta: {
      term,
    },
    payload: {
      url: 'search/query.json',
      query: {
        term,
        apiUsername: 'system',
        includeBlurbs: true,
      },
      schema: search,
      types: SEARCH,
    },
    track: true,
  };
};

// Latest posts
export const FORUMS_GET_LATEST = 'forums/get/latest';
export const LATEST = createRequestActionTypes('LATEST');

export const fetchLatest = projectId => ({
  type: FORUMS_GET_LATEST,
  meta: {
    projectId,
  },
  payload: {
    url: `c/${projectId}/l/latest.json`,
    schema: latest,
    types: LATEST,
  },
});

export const POST_EDIT = 'forums/post/edit';
export const editPost = (postId, topicId) => ({
  type: POST_EDIT,
  payload: {
    postId,
    topicId,
  },
  track: true,
});

export const POST_EDIT_CANCELLED = 'forums/post/edit/cancelled';
export const cancelEdit = () => ({
  type: POST_EDIT_CANCELLED,
});

export const FORUMS_SAVE_POST = 'forums/posts/save';
export const POST_SAVE = createRequestActionTypes('POST_SAVE');
export const savePost = (postId, value) => ({
  type: FORUMS_SAVE_POST,
  meta: {
    postId,
  },
  payload: {
    url: `posts/${postId}`,
    types: POST_SAVE,
    data: {
      raw: value,
    },
    schema: post,
  },
  track: true,
});

export const FORUMS_DELETE_POST = 'forums/delete/post';
export const POST_DELETE = createRequestActionTypes('POST_DELETE');
export const deletePost = (postId, topicId) => ({
  type: FORUMS_DELETE_POST,
  meta: {
    postId,
    topicId,
  },
  payload: {
    url: `posts/${postId}`,
    types: POST_DELETE,
  },
  track: true,
});

export const POST_DELETED = 'FORUM_POST_DELETED';
export const deletePostReference = (postId, topicId) => ({
  type: POST_DELETED,
  meta: {
    postId,
    topicId,
  },
});

export const FORUMS_GET_ANNOUNCEMENTS = 'forums/get/announcements';
export const ANNOUNCEMENTS = createRequestActionTypes('ANNOUNCEMENTS');
export const fetchAnnouncements = () => ({
  type: FORUMS_GET_ANNOUNCEMENTS,
  payload: {
    url: 'c/16.json',
    schema: latest,
    types: ANNOUNCEMENTS,
  },
});

// Categories
export const FORUMS_GET_CATEGORIES = 'forums/get/categories';
export const CATEGORIES = createRequestActionTypes('CATEGORIES');
export const fetchCategories = () => {
  return {
    type: FORUMS_GET_CATEGORIES,
    payload: {
      url: 'categories.json',
      schema: categories,
      types: CATEGORIES,
    },
  };
};

// Fetch the topics in a category (mainly for the projects sidebar)
export const FORUMS_GET_CATEGORY = 'forums/get/category';
export const CATEGORY = createRequestActionTypes('CATEGORY');
export const fetchCategory = id => {
  return {
    type: FORUMS_GET_CATEGORY,
    payload: {
      url: `c/${id}.json`,
      schema: topics,
      types: CATEGORY,
    },
  };
};

export const FORUMS_CATEGORY_CREATE = 'FORUMS_CATEGORY_CREATE';
export const NEW_CATEGORY = createRequestActionTypes('NEW_CATEGORY');
export const createCategory = name => {
  return {
    type: FORUMS_CATEGORY_CREATE,
    payload: {
      url: 'categories.json',
      data: {
        name,
        color: '3AB54A',
        textColor: 'ffffff',
        parentCategoryId: 10, // Hard coded to the Discourse parent record.
      },
      schema: { category },
      types: NEW_CATEGORY,
    },
  };
};

export const FORUM_DISCUSSION_TOGGLED = 'forums/discussion/toggled';
export const toggleDiscussion = id => {
  return {
    type: FORUM_DISCUSSION_TOGGLED,
    payload: {
      id,
    },
  };
};

/**
   Topics
*/
export const FORUMS_GET_TOPIC = 'forums/get/topic';
export const TOPIC = createRequestActionTypes('TOPIC');

export const fetchTopic = id => {
  return {
    type: FORUMS_GET_TOPIC,
    meta: {
      topicId: id,
    },
    payload: {
      url: `t/${id}.json`,
      schema: topic,
      types: TOPIC,
    },
  };
};

export const FORUMS_NEW_TOPIC = 'forums/post/topic';
export const NEW_TOPIC = createRequestActionTypes('NEW_TOPIC');

export const createTopic = (title, body, category) => {
  return {
    type: FORUMS_NEW_TOPIC,
    payload: {
      url: 'posts',
      data: {
        title,
        raw: body,
        category,
      },
      schema: post,
      types: NEW_TOPIC,
    },
  };
};

export const FORUMS_DELETE_TOPIC = 'forums/delete/topic';
export const DELETE_TOPIC = createRequestActionTypes('DELETE_TOPIC');

export const deleteTopic = id => {
  return {
    type: FORUMS_DELETE_TOPIC,
    payload: {
      url: `t/${id}.json`,
      id,
      types: DELETE_TOPIC,
    },
  };
};

/**
  Posts
*/
export const FORUMS_GET_POSTS = 'forums/get/posts';
export const POSTS = createRequestActionTypes('POSTS');

export const fetchPosts = (topicId, postIds) => {
  return {
    type: FORUMS_GET_POSTS,
    payload: {
      url: `t/${topicId}/posts.json`,
      query: {
        postIds,
      },
      schema: topic,
      types: POSTS,
    },
  };
};
export const FORUMS_GET_POST = 'forums/get/post';
export const POST = createRequestActionTypes('POST');

export const fetchPost = postId => {
  return {
    type: FORUMS_GET_POST,
    meta: {
      postId,
    },
    payload: {
      url: `posts/${postId}.json`,
      schema: post,
      types: POST,
    },
  };
};

export const POST_CONTENT_UPDATED = 'forums/posts/new/updated';
export const updatePost = value => ({
  type: POST_CONTENT_UPDATED,
  payload: {
    value,
  },
  track: true,
});

export const NEW_POST_CREATE = 'forums/posts/new/create';
export const NEW_POST = createRequestActionTypes('NEW_POST');
export const createPost = (value, topicId) => ({
  type: NEW_POST_CREATE,
  meta: {
    topicId,
  },
  payload: {
    url: `/posts`,
    data: {
      topicId,
      raw: value,
    },
    types: NEW_POST,
    schema: post,
  },
  track: true,
});

export const FORUM_SUBSCRIBED = 'forums/subscribed';
export const subscribe = url => ({
  type: FORUM_SUBSCRIBED,
  payload: {
    url,
  },
  track: true,
});

export const FORUM_UNSUBSCRIBED = 'forums/unsubscribed';
export const unsubscribe = url => ({
  type: FORUM_UNSUBSCRIBED,
  payload: {
    url,
  },
});

export const UNREAD_NOTIFICATION_RECEIVED = 'forums/unread';
export const updateUnread = payload => ({
  type: UNREAD_NOTIFICATION_RECEIVED,
  payload,
});

// Create new user
export const NEW_USER_CREATE = 'forums/users/new';
export const NEW_USER = createRequestActionTypes('NEW_USER');

export const createUser = payload => ({
  type: NEW_USER_CREATE,
  payload: {
    url: 'users',
    data: {
      ...payload, // has username/password
      active: true,
      approved: true,
      email: __USER__.email,
      name: __USER__.username,
    },
    method: 'POST',
    query: {
      apiUsername: 'system',
    },
    types: NEW_USER,
  },
  track: true,
});

export const NEW_USER_CLEAR = 'NEW_USER_CLEAR';
export const clearNewUser = () => ({
  type: NEW_USER_CLEAR,
});
