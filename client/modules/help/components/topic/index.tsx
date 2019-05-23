import * as React from 'react';
import cx from 'classnames';
import Icon from '@src/components/icon';
import { Link } from 'react-router-dom';

import * as styles from './styles.css';
const bs = require('@src/main.css');

const Topic: React.SFC = () => {
  return (
    <div className={styles.container}>
      <header className={cx(bs.bgPrimary, bs.textLight, bs.py3, bs.mb4)}>
        <hgroup className={bs.container}>
          <div className={cx(bs.row, bs.justifyContentCenter)}>
            <div className={bs.colSm10}>
              <h1 className={cx(bs.display4, bs.textCenter, bs.mb3)}>
                <strong>Help Topic:</strong> Workbenches
              </h1>
            </div>
          </div>
          <div className={cx(bs.row, bs.my3)}>
            <div className={bs.colSm12}>
              <div className={cx(bs.embedResponsive, bs.embedResponsive21By9)}>
                <iframe
                  className={bs.embedResponsiveItem}
                  src="https://www.youtube.com/embed/13qF-pIGdOs"
                />
              </div>
            </div>
          </div>
        </hgroup>
      </header>
      <div className={bs.container}>
        <div className={bs.row}>
          <div className={bs.colSm12}>
            <header className={bs.mb4}>
              <small>
                <Link to="/help" className={bs.textMuted}>
                  <Icon solid name="chevron-left" /> Back to Help Centre
                </Link>
              </small>
              <h3 className={cx(bs.h4, bs.textMuted)}>
                How to run code in your Workbench
              </h3>
            </header>
            <p>
              Iaculis urna, id volutpat lacus laoreet non curabitur gravida arcu
              ac tortor dignissim convallis aenean et tortor at risus viverra
              adipiscing at in. Mattis nunc, sed blandit libero volutpat sed!
            </p>
            <p>
              Iaculis urna, id volutpat lacus laoreet non curabitur gravida arcu
              ac tortor dignissim convallis aenean et tortor at risus viverra
              adipiscing at in. Mattis nunc, sed blandit libero volutpat sed!
            </p>
            <p>
              Iaculis urna, id volutpat lacus laoreet non curabitur gravida arcu
              ac tortor dignissim convallis aenean et tortor at risus viverra
              adipiscing at in. Mattis nunc, sed blandit libero volutpat sed!
            </p>
            <p>
              Iaculis urna, id volutpat lacus laoreet non curabitur gravida arcu
              ac tortor dignissim convallis aenean et tortor at risus viverra
              adipiscing at in. Mattis nunc, sed blandit libero volutpat sed!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic;
