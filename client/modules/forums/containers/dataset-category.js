import { connect } from 'react-redux';
import get from 'lodash/get';
import last from 'lodash/last';
import { withRouter } from 'react-router-dom';

import DatasetCategoryItem from '../components/sidebar/dataset-category-item';
import { fetchCategory, toggleDiscussion } from '../actions';

const mapStateToProps = (state, props) => {
  const topicIds = Object.keys(state.forums.topics.entities);
  const datasetIds = Object.keys(state.datasets.entities.datasets);
  const data = get(state, ['forums', 'categories', 'entities', props.id], {});
  const allTopics = topicIds.map(id =>
    get(state, ['forums', 'topics', 'entities', id], {})
  );
  const currentTopicId = Number(last(props.location.pathname.split('/')));
  const topics = allTopics.filter(topic => topic.categoryId === props.id);
  const isParentOfCurrentTopic = topics.some(t => t.id === currentTopicId);
  const dataset = datasetIds
    .map(id => state.datasets.entities.datasets[id] || {})
    .find(d => d.name === data.name);

  return {
    categoryId: data.parentCategoryId,
    match: props.match,
    open:
      state.forums.viewState.openSidebarItemIds.includes(props.id) ||
      isParentOfCurrentTopic,
    data,
    topics,
    dataset: dataset || {},
  };
};

export default withRouter(
  connect(mapStateToProps, {
    fetchCategory,
    onToggle: toggleDiscussion,
  })(DatasetCategoryItem)
);
