import * as React from 'react';
import Button from '@src/components/button';
import cx from 'classnames';
import { Link, RouteComponentProps } from 'react-router-dom';

import * as styles from './styles.css';
const bs = require('@src/main.css');

export interface HelpMainProps extends RouteComponentProps<any> { }

const HelpMain: React.SFC<HelpMainProps> = ({ match }) => {
  return (
    <div className={styles.container}>
      <header className={cx(bs.bgPrimary, bs.textLight, bs.py3, bs.mb4)}>
        <hgroup className={bs.container}>
          <div className={cx(bs.row, bs.justifyContentCenter)}>
            <div className={bs.colSm10}>
              <h1 className={cx(bs.display4, bs.textCenter, bs.mb3)}>
                Workbench Help & Documentation
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
            <form className={bs.my4}>
              <input
                type="search"
                className={cx(bs.formControl, bs.formControlLg)}
                placeholder="Search Help Documents"
              />
            </form>
            <p>
              Not sure where to start using PROOF Secure Research Environment?
              Check out our help topics below. If you don’t find what you’re
              looking for, be sure to contact us{' '}
              <a href="mailto:help@data.gov.bc.ca">help@data.gov.bc.ca</a>.
            </p>
          </div>
          <div className={bs.colSm4}>
            <div className={cx(bs.card, bs.mb3)}>
              <div className={bs.cardBody}>
                <h5 className={bs.cardTitle}>Using the Workbench</h5>
                <p className={bs.cardText}>
                  Learn how to use the JupyterHub-powered Workbench to process
                  your data analyses.
                </p>
                <Button block url={`${match.url}/123`}>
                  View Topic
                </Button>
              </div>
            </div>
          </div>
          <div className={bs.colSm4}>
            <div className={cx(bs.card, bs.mb3)}>
              <div className={bs.cardBody}>
                <h5 className={bs.cardTitle}>Using the Workbench</h5>
                <p className={bs.cardText}>
                  Learn how to use the JupyterHub-powered Workbench to process
                  your data analyses.
                </p>
                <Button block url={`${match.url}/123`}>
                  View Topic
                </Button>
              </div>
            </div>
          </div>
          <div className={bs.colSm4}>
            <div className={cx(bs.card, bs.mb3)}>
              <div className={bs.cardBody}>
                <h5 className={bs.cardTitle}>Using the Workbench</h5>
                <p className={bs.cardText}>
                  Learn how to use the JupyterHub-powered Workbench to process
                  your data analyses.
                </p>
                <Button block url={`${match.url}/123`}>
                  View Topic
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpMain;
