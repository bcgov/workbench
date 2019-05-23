import * as React from 'react';
import cx from 'classnames';
import Icon from '@src/components/icon';
import { Link } from 'react-router-dom';

const bs = require('@src/main.css');

const DiscussionItem: React.SFC = () => (
  <article className={cx(bs.borderBottom, bs.py3)}>
    <header
      className={cx(bs.dFlex, bs.alignItemsCenter, bs.justifyContentBetween)}
    >
      <h5>
        <Link to="/datasets/123">
          <Icon solid name="comments" color="muted" className={bs.mr2} /> What
          regional variations in response time have you found?
        </Link>
      </h5>
      <small className={bs.textMuted}>
        Last post <time>July 3, 2018</time>
      </small>
    </header>
    <p className={bs.mb0}>
      ... <mark>algorithm</mark> are you using to find the variations in the
      response time?
    </p>
  </article>
);

export default DiscussionItem;
