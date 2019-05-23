import { connect } from 'react-redux';

import Dashboard from '../components/dashboard';

const mapStateToProps = (state) => ({
  ...state.app,
});

export default connect(mapStateToProps)(Dashboard);
