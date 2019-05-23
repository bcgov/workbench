import * as React from 'react';
import cx from 'classnames';
import Icon from '@src/components/icon';
import { Link } from 'react-router-dom';

import * as styles from './styles.css';
const bs = require('@src/main.css');

const Post: React.SFC = () => (
  <div className={cx(bs.bgLight, styles.container)}>
    <article className={cx(styles.post, bs.my3, bs.mxAuto, bs.w75, bs.p3)}>
      <header className={cx(bs.mb3, bs.borderBottom)}>
        <small className={bs.textMuted}>
          <Icon name="calendar-alt" /> Posted on July 3rd, 2018
        </small>
        <h1>Introducing Weka Support</h1>
        <small className={cx(bs.dBlock, bs.mb3, bs.textMuted)}>
          <Icon solid name="user" /> Written by Author Name
        </small>
      </header>
      <div>
        <p>
          Augue eget arcu dictum varius. Tortor dignissim convallis aenean et
          tortor at risus viverra adipiscing at in tellus integer feugiat
          scelerisque varius morbi enim nunc, faucibus a pellentesque sit amet.
        </p>
        <p>
          Augue eget arcu dictum varius. Tortor dignissim convallis aenean et
          tortor at risus viverra adipiscing at in tellus integer feugiat
          scelerisque varius morbi enim nunc, faucibus a pellentesque sit amet.
        </p>
        <p>
          Augue eget arcu dictum varius. Tortor dignissim convallis aenean et
          tortor at risus viverra adipiscing at in tellus integer feugiat
          scelerisque varius morbi enim nunc, faucibus a pellentesque sit amet.
        </p>
        <p>
          Augue eget arcu dictum varius. Tortor dignissim convallis aenean et
          tortor at risus viverra adipiscing at in tellus integer feugiat
          scelerisque varius morbi enim nunc, faucibus a pellentesque sit amet.
        </p>
      </div>
      <footer className={cx(bs.borderTop, bs.mt3, bs.pt3)}>
        <nav className={cx(bs.dFlex, bs.justifyContentBetween, styles.nav)}>
          <Link
            to="/announcements/121"
            className={cx(bs.dFlex, bs.alignItemsCenter)}
          >
            <Icon solid name="chevron-left" className={bs.mr3} />
            <span>
              <small className={bs.textMuted}>Newer Post</small>
              <p>Introducing Weka Support</p>
            </span>
          </Link>
          <Link
            to="/announcements/123"
            className={cx(bs.dFlex, bs.alignItemsCenter, bs.textRight)}
          >
            <span>
              <small className={bs.textMuted}>Older Post</small>
              <p>Starter Workbenches are ready</p>
            </span>
            <Icon solid name="chevron-right" className={bs.ml3} />
          </Link>
        </nav>
        <small className={bs.textMuted}>
          Report an error • Contact an administrator • Help and Documentation •
          Privacy Policy
        </small>
      </footer>
    </article>
  </div>
);

export default Post;
