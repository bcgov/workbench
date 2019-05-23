import React, { Component } from 'react';
import formatDistance from 'date-fns/formatDistance';
import { Link } from 'react-router-dom';
import last from 'lodash/last';
import isUndefined from 'lodash/isUndefined';
import cx from 'classnames';

import Avatar from '../containers/avatar';
import styles from './styles.css';
import bs from 'main.css';

class Recent extends Component {
  componentDidMount() {
    const { fetchLatest, projectId } = this.props;

    if (projectId) {
      fetchLatest(projectId);
    }
  }

  componentDidUpdate(prevProps) {
    const { fetchLatest, projectId } = this.props;

    if (projectId && isUndefined(prevProps.projectId)) {
      fetchLatest(projectId);
    }
  }

  render() {
    const { data, match } = this.props;

    return (
      <div>
        {data.map((post, index) => (
          <div key={post.id} className={bs.p3}>
            <div className={bs.dFlex}>
              <div>
                <Avatar userId={last(post.posters).userId} />
              </div>
              <div className={bs.ml3} style={{ flex: 1 }}>
                <small className={cx(bs.textMuted, bs.dBlock)}>
                  <strong>{post.lastPosterUsername}</strong> wrote{' '}
                  {formatDistance(post.bumpedAt, new Date())} ago
                </small>
                <h6>
                  <Link to={`${match.url}/discussions/${post.id}`}>
                    {post.fancyTitle}
                  </Link>
                </h6>
                <p className={bs.mb1}>{post.excerpt}</p>
              </div>
            </div>
          </div>
        ))}
        <Link
          to={`${match.url}/discussions`}
          className={cx(styles.discussionsReadMoreBtn, bs.border, bs.borderTop)}
        >
          Read More in Discussions
        </Link>
      </div>
    );
  }
}

export default Recent;
