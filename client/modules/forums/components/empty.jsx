import React from 'react';
import cx from 'classnames';

import bs from 'main.css';
import styles from './styles.css';
import Icon from 'components/icon';

function Empty() {
  return (
    <div
      className={cx(
        bs.dFlex,
        bs.alignItemsCenter,
        bs.justifyContentCenter,
        styles.empty
      )}
    >
      <div className={bs.textCenter}>
        <Icon name="comments" size="3x" color="muted" />
        <div>Welcome to Discussion</div>
      </div>
    </div>
  );
}

export default Empty;
