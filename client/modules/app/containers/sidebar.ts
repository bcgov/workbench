import { connect } from 'react-redux';
import Types from 'Types';

import Sidebar from '../components/sidebar';
import { toggleSidebarVisibility } from '../actions';

const mapStateToProps = (state: Types.RootState) => ({
  open: state.app.isSidebarOpen,
});

export default connect(mapStateToProps, {
  onToggleSidebarVisibility: toggleSidebarVisibility,
})(Sidebar);
