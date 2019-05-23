import { connect } from 'react-redux';

import Annoucements from '../components/announcements';
import { fetchAnnouncements } from '../actions';

const mapStateToProps = (state) => {
  const ids = Object.keys(state.forums.topics.entities);
  const topics = ids.map(id => state.forums.topics.entities[id]);

  return {
    data: topics.filter(t => t.categoryId === 16).sort((a, b) => a.lastPostedAt > b.lastPostedAt),
  };
};

export default connect(mapStateToProps, {
  fetchAnnouncements,
})(Annoucements);
