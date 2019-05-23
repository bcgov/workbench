import * as React from 'react';
import Avatar from '@src/components/avatar';
import cx from 'classnames';
import Icon from '@src/components/icon';
import { Link } from 'react-router-dom';

import * as styles from './styles.css';
const bs = require('@src/main.css');

const TopicSidebar: React.SFC = () => {
  return (
    <aside className={styles.sidebar}>
      <header className={cx(bs.p3, bs.borderBottom)}>
        <h2 className={cx(bs.h5, bs.mb0)}>
          <Icon solid name="info-circle" className={bs.mr3} color="muted" />Topic
          Details
        </h2>
      </header>
      <div className={cx(bs.p3, bs.borderBottom)}>
        <dl>
          <dt>Created At</dt>
          <dd>Yesterday at 10:48pm</dd>
          <dt>Started By</dt>
          <dd>
            <Avatar size="sm" value="A" /> Arther B. Goodman
          </dd>
          <dt>
            Participants <span className={cx(bs.badge, bs.badgeLight)}>3</span>
          </dt>
          <dd>
            <Avatar size="sm" value="A" /> <Avatar size="sm" value="K" />{' '}
            <Avatar size="sm" value="M" />
          </dd>
        </dl>
      </div>
      <header className={cx(bs.p3, bs.borderBottom)}>
        <h2 className={cx(bs.h5, bs.mb0)}>
          <Link to="/discussions?filter=starred">
            <Icon solid name="star" className={bs.mr3} color="warning" />Starred
            Topics <span className={cx(bs.badge, bs.badgeLight)}>1</span>
          </Link>
        </h2>
      </header>
      <div className={cx(bs.p3, bs.borderBottom)}>
        <Link
          to="/discussions/123"
          className={cx(bs.dFlex, bs.alignItemsCenter, bs.mb3)}
        >
          <Avatar size="md" value="P" className={bs.mr2} />
          <span style={{ flex: 1 }}>
            <small className={cx(bs.textMuted, bs.dBlock)}>
              Today at 12:31pm
            </small>
            Question about Hospital Visits data sources
          </span>
        </Link>
      </div>
      <header className={cx(bs.p3, bs.borderBottom)}>
        <h2 className={cx(bs.h5, bs.mb0)}>
          <Link to="/discussions?filter=recent">
            <Icon solid name="clock" className={bs.mr3} color="muted" />Recent
            Posts
          </Link>
        </h2>
      </header>
      <div className={cx(bs.p3, bs.borderBottom)}>
        <Link
          to="/discussions/123"
          className={cx(bs.dFlex, bs.alignItemsCenter, bs.mb3)}
        >
          <Avatar size="md" value="P" className={bs.mr2} />
          <span style={{ flex: 1 }}>
            <small className={cx(bs.textMuted, bs.dBlock)}>
              Today at 12:31pm
            </small>
            Question about Hospital Visits data sources
          </span>
        </Link>
        <Link
          to="/discussions/123"
          className={cx(bs.dFlex, bs.alignItemsCenter, bs.mb3)}
        >
          <Avatar size="md" value="P" className={bs.mr2} />
          <span style={{ flex: 1 }}>
            <small className={cx(bs.textMuted, bs.dBlock)}>
              Today at 12:31pm
            </small>
            Question about Hospital Visits data sources
          </span>
        </Link>
      </div>
    </aside>
  );
};

export default TopicSidebar;
