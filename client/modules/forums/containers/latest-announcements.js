import { connect } from 'react-redux';

import LatestAnnoucements from '../components/latest-announcements';
import { fetchAnnouncements } from '../actions';

const mapStateToProps = (state) => {
  const ids = Object.keys(state.forums.topics.entities);
  const topics = ids.map(id => state.forums.topics.entities[id]);

  return {
    data: topics.filter(t => t.categoryId === 16)
      .sort((a, b) => a.lastPostedAt > b.lastPostedAt)
      .slice(0, 2),
  };
};

export default connect(mapStateToProps, {
  fetchAnnouncements,
})(LatestAnnoucements);
