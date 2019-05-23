import { connect } from 'react-redux';
import get from 'lodash/get';

import Recent from '../components/recent';
import { fetchLatest } from '../actions';

const mapStateToProps = state => {
  const projectId = get(state, 'forums.viewState.projectCategory.id');
  const ids = Object.keys(state.forums.latest.entities);
  const data = ids
    .map(id => state.forums.latest.entities[id])
    .filter(post => post.categoryId !== 16)
    .sort((a, b) => b.updatedAt > a.updatedAt)
    .reverse()
    .slice(0, 4);

  return {
    projectId,
    data,
  };
};

export default connect(mapStateToProps, {
  fetchLatest,
})(Recent);
