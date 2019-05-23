import { connect } from 'react-redux';
import Settings from '../components/settings';
import Types from 'Types';

const mapStateToProps = (state: Types.RootState) => ({
  data: state.app.user,
});

export default connect(mapStateToProps)(Settings);
