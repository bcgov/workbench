import { connect } from 'react-redux';
import get from 'lodash/get';

import Dataset from '../components/dataset';
import { fetchSearch } from 'modules/forums/actions';

const mapStateToProps = (state, props) => {
  const datasetId = props.match.params.id;

  return {
    datasetId,
    data: get(state, ['datasets', 'entities', 'datasets', datasetId], {}),
  };
};

export default connect(mapStateToProps, {
  fetchSearch,
})(Dataset);
