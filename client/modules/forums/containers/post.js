import { connect } from 'react-redux';
import get from 'lodash/get';

import Post from '../components/post';
import { deletePost, editPost } from '../actions';

const mapStateToProps = (state, props) => {
  return {
    data: get(state, ['forums', 'posts', 'entities', props.id], {}),
    fetchStatus: get(state, ['forums', 'posts', 'fetchStatus', props.id]),
    editing: props.id === state.forums.viewState.editing,
  };
};

export default connect(mapStateToProps, {
  deletePost,
  editPost,
})(Post);
