import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import DiscussionButton from '../components/discussion-button';
import { createCategory } from '../actions';

const mapStateToProps = (state, props) => {
  const { name } = props.dataset;
  const categoryIds = Object.keys(state.forums.categories.entities);
  const topicIds = Object.keys(state.forums.topics.entities);
  const categories = categoryIds.map(id => state.forums.categories.entities[id]);
  const topics = topicIds.map(id => state.forums.topics.entities[id]);
  const datasetCategory = categories.find(topic => topic.name === name);
  const relatedTopics = datasetCategory ?
        topics.filter(topic => topic.categoryId === datasetCategory.id) :
        [];

  return {
    topics: relatedTopics,
  };
};

export default withRouter(connect(mapStateToProps, {
  createCategory,
})(DiscussionButton));
