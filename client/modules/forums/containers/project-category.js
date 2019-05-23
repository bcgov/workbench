import { connect } from 'react-redux';
import get from 'lodash/get';
import { withRouter } from 'react-router-dom';

import ProjectCategoryItem from '../components/sidebar/project-category-item';

const mapStateToProps = (state, props) => {
  return {
    data: get(state, ['forums', 'categories', 'entities', props.id], {})
  };
};

export default withRouter(connect(mapStateToProps)(ProjectCategoryItem));
