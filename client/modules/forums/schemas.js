import { schema } from 'normalizr';
import get from 'lodash/get';

const user = new schema.Entity('users');
export const users = new schema.Array(user);

export const category = new schema.Entity('categories', {}, {
  processStrategy(entity) {
    return {
      subcategoryIds: [],
      ...entity,
    };
  },
});
export const post = new schema.Entity('posts');
export const topic = new schema.Entity('topics', {
  posts: [post],
  details: {
    participants: [user],
  },
}, {
  // Flatten out some of the nested stream content so it's easier to work with
  processStrategy(entity) {
    return {
      ...entity,
      // Posts are all the actual post models in the payload only, not the entire topic
      posts: get(entity, 'postStream.posts', []),
      // Stream is the order of all the posts, additional missing ones from the `posts`
      // key will have to be fetched.
      stream: get(entity, 'postStream.stream', []),
    };
  },
});

// Normalizations for the API responses
export const bootstrap = {
  categories: [category],
};

export const latest = {
  users: [user],
  topicList: {
    topics: [topic],
  },
};

export const categories = {
  categoryList: {
    categories: [category],
  },
};

export const topics = {
  topicList: {
    topics: [topic],
  },
};

// Search
export const search = {
  categories: [category],
  posts: [post],
  topics: [topic],
  users: [user],
};
