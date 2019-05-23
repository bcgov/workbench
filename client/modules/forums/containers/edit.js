import { connect } from 'react-redux';
import get from 'lodash/get';

import Edit from '../components/edit';
import {
  cancelEdit,
  fetchPost,
  savePost,
} from '../actions';

const mapStateToProps = (state, props) => ({
  fetchStatus: get(state, ['forums', 'posts', 'fetchStatus', props.postId]),
  original: get(state, ['forums', 'posts', 'entities', props.postId, 'raw'], ''),
});

export default connect(mapStateToProps, {
  fetchPost,
  cancelEdit,
  savePost,
})(Edit);
