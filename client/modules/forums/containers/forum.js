import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Forums from '../components/forum.jsx';
import { fetchBootstrap } from '../actions';

const mapStateToProps = (state) => {
  return {
    isBooted: state.forums.viewState.isBooted,
    entities: {},
  };
};

export default withRouter(connect(mapStateToProps, {
  fetchBootstrap,
})(Forums));
