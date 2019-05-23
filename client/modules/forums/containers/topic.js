import { connect } from 'react-redux';
import get from 'lodash/get';

import Topic from '../components/topic';
import {
  subscribe,
  unsubscribe,
  deleteTopic,
  fetchPosts,
  fetchTopic,
} from '../actions';

const mapStateToProps = (state, props) => {
  const { topicId } = props.match.params;

  return {
    fetchStatus: get(state, ['forums', 'topics', 'fetchStatus', topicId]),
    posts: state.forums.posts.entities,
    data: get(state, ['forums', 'topics', 'entities', topicId], {}),
  };
};

export default connect(mapStateToProps, {
  subscribe,
  unsubscribe,
  fetchPosts,
  fetchTopic,
  onDelete: deleteTopic,
})(Topic);
