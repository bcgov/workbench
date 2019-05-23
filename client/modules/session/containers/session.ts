import Types from 'Types';
import { connect } from 'react-redux';

import Session from '../components/session';

const mapStateToProps = (state: Types.RootState) => ({
  isSessionExpired: state.session.expired,
});

export default connect(mapStateToProps)(Session);
