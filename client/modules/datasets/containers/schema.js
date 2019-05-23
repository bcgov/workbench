import { connect } from 'react-redux';
import get from 'lodash/get';

import Schema from '../components/schema';
import { fetchSamples } from '../actions';

const mapStateToProps = (state, props) => ({
  dataset: get(state, ['datasets', 'entities', 'datasets', props.datasetId], {}),
  data: get(state, ['datasets', 'entities', 'schemas', props.datasetId], []),
});

export default connect(mapStateToProps, {
  fetchSamples,
})(Schema);
