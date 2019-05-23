import { connect } from 'react-redux';
import get from 'lodash/get';

import Project from '../components/project';
import { fetchProject } from '../actions';

const mapStateToProps = (state, props) => {
  return {
    data: get(state, ['app', 'projects', props.match.params.projectId], {}),
  };
};

export default connect(mapStateToProps, {
  fetchProject,
})(Project);
