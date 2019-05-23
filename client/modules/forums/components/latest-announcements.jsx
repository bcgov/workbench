import React, { Component } from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import DateTime from 'components/date-time';
import Icon from 'components/icon';
import bs from 'main.css';

class Announcements extends Component {
  componentDidMount() {
    this.props.fetchAnnouncements();
  }

  render() {
    const { data, match } = this.props;

    return (
      <div>
        <header className={cx(bs.px3, bs.pt2)}>
          <h5>
            <Link to="/announcements" className={bs.textWhite}>
              <Icon name="bell" className={cx(bs.mr2, bs.textLight)} />{' '}
              Announcements
            </Link>
          </h5>
        </header>
        <div className={bs.p3}>
          <ul className={bs.listUnstyled}>
            {data.map((post, index) => (
              <li key={index} className={cx()}>
                <small className={bs.textLight}>
                  <DateTime date={post.createdAt} />
                </small>
                <p>
                  <Link
                    to={`/announcements/${post.id}`}
                    className={bs.textPrimary}
                  >
                    {post.title}
                  </Link>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Announcements;
