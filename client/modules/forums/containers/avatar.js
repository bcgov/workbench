import { connect } from 'react-redux';
import get from 'lodash/get';

import Avatar from '../components/avatar';

const mapStateToProps = (state, props) => ({
  user: get(state, ['researchers', 'entities', props.userId], { avatarTemplate: '' }),
});

export default connect(mapStateToProps)(Avatar);
