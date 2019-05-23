import get from 'lodash/get';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchCategory, fetchCategories } from '../actions';
import Sidebar from '../components/sidebar';

const mapStateToProps = state => {
  const datasetIds = Object.keys(state.datasets.entities.datasets);
  const datasets = datasetIds
    .map(id => state.datasets.entities.datasets[id])
    .map(d => d.name);
  const projectId = get(state, 'forums.viewState.projectCategory.id');
  const ids = Object.keys(state.forums.categories.entities);
  const topicIds = Object.keys(state.forums.topics.entities);
  const data = ids
    .map(id => state.forums.categories.entities[id])
    .filter(c => datasets.includes(c.name))
    .map(c => c.id);
  const topics = topicIds.map(id => state.forums.topics.entities[id]);
  const projectTopics = topics.filter(topic => topic.categoryId === projectId);

  return {
    projectId,
    datasets: data,
    projects: projectTopics,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    fetchCategory,
    fetchCategories,
  })(Sidebar)
);
