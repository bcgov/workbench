import { connect } from 'react-redux';

import ResearchersList from '../components/researchers-list';

const mapStateToProps = (state) => {
  const ids = Object.keys(state.researchers.entities);
  const data = ids.map(id => state.researchers.entities[id])
        .filter(researcher => researcher.id > 0);

  return {
    data
  };
};

export default connect(mapStateToProps)(ResearchersList);
