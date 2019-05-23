import * as React from 'react';
import cx from 'classnames';

import bs from '@src/main.css';

export interface SessionProps {
  isSessionExpired: boolean;
  children: React.ReactNode;
}

function Session({ isSessionExpired, children }: SessionProps) {
  return (
    <React.Fragment>
      {isSessionExpired && (
        <React.Fragment>
          <div
            key={1}
            className={cx(bs.modal, bs.show)}
            tabIndex={-1}
            role="dialog"
            style={{ display: 'block' }}
          >
            <div className={cx(bs.modalDialog, bs.modalSm)} role="document">
              <div className={bs.modalContent}>
                <div className={bs.modalHeader}>
                  <h5 className={bs.modalTitle}>Session Expired</h5>
                </div>
                <div className={bs.modalBody}>
                  Please re-authenticate to continue use the SRE web
                  application.
                </div>
                <div className={bs.modalFooter}>
                  <a
                    href={`/authenticate?project=air_quality_health`}
                    className={cx(bs.btn, bs.btnPrimary)}
                  >
                    Renew Session
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div key={2} className={cx(bs.modalBackdrop, bs.show)} />
        </React.Fragment>
      )}

      {children}
    </React.Fragment>
  );
}

export default Session;
