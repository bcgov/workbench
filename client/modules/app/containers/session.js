import { connect } from 'react-redux';

import SessionExpired from '../components/session-expired';

const mapStateToProps = (state) => {
  const projectId = state.routing.location.pathname.split('/')[1];

  return {
    project: projectId,
    isExpired: state.app.isExpired,
  };
};

export default connect(mapStateToProps)(SessionExpired);
