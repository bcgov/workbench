import { connect } from 'react-redux';
import get from 'lodash/get';

const mapStateToProps = (state, props) => {
  const datasetIds = Object.keys(state.datasets.entities.datasets);
  const category = get(
    state,
    ['forums', 'categories', 'entities', props.id],
    {}
  );
  const dataset = datasetIds
    .map(id => state.datasets.entities.datasets[id] || {})
    .find(d => d.name === category.name);
  return {
    category,
    dataset: dataset || {},
  };
};

export default connect(mapStateToProps);
