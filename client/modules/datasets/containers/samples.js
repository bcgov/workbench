import { connect } from 'react-redux';
import get from 'lodash/get';

import Samples from '../components/samples';
import { fetchSamples } from '../actions';

const mapStateToProps = (state, props) => {
  return {
    data: get(state, ['datasets', 'entities', 'samples', props.datasetId], []),
    fields: get(state, ['datasets', 'entities', 'schemas', props.datasetId], []),
  };
};

export default connect(mapStateToProps, {
  fetchSamples,
})(Samples);
