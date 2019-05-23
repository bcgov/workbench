import React from 'react';
import cx from 'classnames';

import Button from 'components/button';
import bs from 'main.css';

function SessionExpired({ isExpired, project }) {
  if (!isExpired) {
    return null;
  }

  return  [
    <div key={1} className={cx(bs.modal, bs.show)} tabIndex={-1} role="dialog" style={{ display: 'block' }}>
      <div className={cx(bs.modalDialog, bs.modalSm)} role="document">
        <div className={bs.modalContent}>
          <div className={bs.modalHeader}>
            <h5 className={bs.modalTitle}>Session Expired</h5>
          </div>
          <div className={bs.modalBody}>
            Please re-authenticate to continue use the SRE web application.
          </div>
          <div className={bs.modalFooter}>
            <a href={`/authenticate?project=${project}`} className={cx(bs.btn, bs.btnPrimary)}>
              Renew Session
            </a>
          </div>
        </div>
      </div>
    </div>,
    <div key={2} className={cx(bs.modalBackdrop, bs.show)}/>
  ];
}

export default SessionExpired;
