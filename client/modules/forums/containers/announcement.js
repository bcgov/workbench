import { connect } from 'react-redux';
import get from 'lodash/get';

import { fetchPosts } from '../actions';
import Announcement from '../components/announcement';

const mapStateToProps = (state, props) => {
  const topic = get(state, ['forums', 'topics', 'entities', props.match.params.postId], {});
  const postIds = get(topic, 'posts', []);
  const posts = postIds.map(id => state.forums.posts.entities[id]);
  return {
    data: topic,
    posts,
  };
};

export default connect(mapStateToProps, {
  fetchPosts,
})(Announcement);
