import React from 'react';
import cx from 'classnames';

import styles from './styles.css';
import bs from 'main.css';

function UnreadBadge({ count = 0 }) {
  if (!count) return null;

  return (
    <span className={cx(bs.rounded, bs.textInfo, styles.unreadBadge)}>
      &bull;
    </span>
  );
}

export default UnreadBadge;
