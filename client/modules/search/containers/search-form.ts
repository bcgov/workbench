import { connect } from 'react-redux';

import SearchForm from '../components/search-form';
import { search } from '../actions';

const mapStateToProps = () => {
  return {
    results: [],
  };
};

export default connect(mapStateToProps, {
  onSearch: search,
})(SearchForm);
