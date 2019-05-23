import { connect } from 'react-redux';

import UnreadBadge from '../components/unread-badge';

const mapStateToProps = state => ({
  count: state.forums.viewState.unreadIds.length,
});

export default connect(mapStateToProps)(UnreadBadge);
