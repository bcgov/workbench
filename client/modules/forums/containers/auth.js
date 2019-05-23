import { connect } from 'react-redux';

import Auth from '../components/auth';
import { fetchBootstrap, fetchUsers } from '../actions';

const mapStateToProps = state => ({
  userStatus: state.forums.viewState.userStatus,
});

export default connect(mapStateToProps, {
  fetchBootstrap,
  fetchUsers,
})(Auth);
