import { connect } from 'react-redux';
import get from 'lodash/get';

import { fetchNotebooks } from '../actions';
import Notebooks from '../components/notebooks';

const mapStateToProps = (state, props) => ({
  user: state.app.user,
  fetchStatus: state.notebooks.fetchStatus,
  data: get(state, ['notebooks', 'entities', props.projectId], []),
});

export default connect(mapStateToProps, {
  fetchNotebooks,
})(Notebooks);
