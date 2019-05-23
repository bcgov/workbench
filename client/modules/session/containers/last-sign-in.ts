import { connect } from 'react-redux';
import Types from 'Types';

import LastLoginText from '../components/last-login-text';

const mapStateToProps = (state: Types.RootState) => ({
  value: state.session.lastAuthTime,
});

export default connect(mapStateToProps)(LastLoginText);
