import * as React from 'react';
import cx from 'classnames';
import Icon from '@src/components/icon';

const bs = require('@src/main.css');

const NotFound: React.SFC = () => (
  <div
    className={cx(
      bs.dFlex,
      bs.alignItemsCenter,
      bs.justifyContentCenter,
      bs.bgLight
    )}
    style={{ flex: 1 }}
  >
    <div className={cx(bs.card, bs.textCenter, bs.textLight, bs.bgDanger)}>
      <div className={bs.cardBody}>
        <Icon solid name="question" size="2x" className={bs.mb2} />
        <p className={bs.cardText}>Page Not Found</p>
      </div>
    </div>
  </div>
);

export default NotFound;
