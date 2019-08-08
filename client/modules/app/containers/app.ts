import { connect } from 'react-redux';
import Types from 'Types';
import { withRouter } from 'react-router-dom';

import App from '../components/app';
import { fetchUser } from '../actions';

const mapStateToProps = (state: Types.RootState) => ({
  user: state.app.user,
  fetchStatus: state.app.fetchStatus
});

export default withRouter(
  connect(mapStateToProps, {
    fetchUser,
  })(App)
);
