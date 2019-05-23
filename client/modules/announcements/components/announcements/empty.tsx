import * as React from 'react';
import cx from 'classnames';
import Icon from '@src/components/icon';

import * as styles from './styles.css';
const bs = require('@src/main.css');

const Empty: React.SFC = () => (
  <div
    className={cx(
      bs.bgLight,
      styles.container,
      bs.alignItemsCenter,
      bs.justifyContentCenter
    )}
  >
    <div className={bs.card}>
      <div className={cx(bs.cardBody, bs.textCenter)}>
        <Icon solid name="newspaper" size="3x" color="light" />
        <p className={bs.cardText}>
          <Icon solid name="arrow-left" /> Select a post from the left
        </p>
      </div>
    </div>
  </div>
);

export default Empty;
