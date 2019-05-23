import { connect } from 'react-redux';

import Datasets from '../components/datasets';

const mapStateToProps = (state) => {
  const ids = Object.keys(state.datasets.entities.datasets);
  const datasets = ids.map(id => state.datasets.entities.datasets[id]);

  return {
    datasets,
  };
};

export default connect(mapStateToProps)(Datasets);
