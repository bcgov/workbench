import { connect } from 'react-redux';
import Types from 'Types';

import Results from '../components/results';
import { fetchSearch } from '@src/modules/forums/actions';
import { searchDatasets } from '@src/modules/search/actions';

const mapStateToProps = (state: Types.RootState) => {
  const discussionResults = state.search.discussions.map(
    id => state.forums.topics.entities[id]
  );
  const postsResults = state.search.posts.map(
    id => state.forums.posts.entities[id]
  );

  return {
    discussionResults,
    postsResults,
    datasetResults: state.search.datasets,
    isLoading: state.search.fetchSatus === 'loading',
    term: state.search.term,
  };
};

export default connect(mapStateToProps, {
  onSearch: fetchSearch,
  searchDatasets,
})(Results);
