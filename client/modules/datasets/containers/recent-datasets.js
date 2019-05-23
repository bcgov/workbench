import { connect } from 'react-redux';

import Recent from '../components/recent';

const mapStateToProps = (state) => {
  const ids = Object.keys(state.datasets.entities.datasets);
  const categoryIds = Object.keys(state.forums.categories.entities);
  const datasets = ids.map(id => state.datasets.entities.datasets[id]);
  const categories = categoryIds.map(id => state.forums.categories.entities[id]);
  const categoryNames = categories.map(category => category.name);

  return {
    data: datasets.slice(0, 8),
    categoryNames,
  };
};

export default connect(mapStateToProps)(Recent);
