import React from 'react';
import cx from 'classnames';

import bs from 'main.css';

function NotFound() {
  return (
    <div
      className={cx(bs.dFlex, bs.alignItemsCenter, bs.justifyContentCenter)}
      style={{
        flex: 1,
        background: `url(/assets/images/login-bg.jpg) no-repeat center center fixed`,
      }}
    >
      <div className={bs.card} style={{ width: '20rem' }}>
        <div className={bs.cardBody}>
          <h5 className={cx(bs.cardTitle, bs.textDanger)}>Page Not Found.</h5>
          <p className={bs.cardText}>
            This might be a project that isn't available yet. Try viewing one of
            the available projects below.
          </p>
        </div>
        <div className={cx(bs.listGroup, bs.listGroupFlush)}>
          <a
            href="/air_quality_health"
            className={cx(bs.listGroupItem, bs.listGroupItemAction)}
          >
            Air Quality and Health
          </a>
          <a
            href="/education_and_training"
            className={cx(bs.listGroupItem, bs.listGroupItemAction)}
          >
            Education & Training Relationships
          </a>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
