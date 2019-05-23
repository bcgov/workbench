import { connect } from 'react-redux';

import {
  updatePost,
  createPost,
} from '../actions';
import PostComposer from '../components/post-composer';

const mapStateToProps = (state) => {
  return {
    postStatus: state.forums.newPost.postStatus,
    value: state.forums.newPost.content,
    errors: state.forums.newPost.errors,
  };
};

export default connect(mapStateToProps, {
  onChange: updatePost,
  onSubmit: createPost,
})(PostComposer);
