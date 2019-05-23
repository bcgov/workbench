import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import get from 'lodash/get';

import NewTopic from '../components/new-topic';
import { createTopic } from '../actions';

const mapStateToProps = (state, props) => {
  const ids = Object.keys(state.datasets.entities.datasets);
  const categoryIds = Object.keys(state.forums.categories.entities);
  const datasets = ids.map(id => state.datasets.entities.datasets[id]);
  const dataset = get(props, 'location.state.dataset', {});
  const categories = categoryIds.map(id => state.forums.categories.entities[id]);
  const projectId = get(state, 'forums.viewState.projectCategory.id');

  return {
    errors: state.forums.newTopic.errors,
    postStatus: state.forums.newTopic.postStatus,
    preloadedDatasetId: dataset.id,
    datasets,
    categories,
    projectId,
  };
};

export default withRouter(connect(mapStateToProps, {
  createTopic,
})(NewTopic));
