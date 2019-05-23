import React from 'react';
import cx from 'classnames';

import bs from 'main.css';

const Alert = ({ children, onClose }) => (
  <div className={cx(bs.alert, bs.alertInfo, bs.alertDismissible, bs.m3)}>
    {children}
    {
      onClose &&
      <button
        type="button"
        className={bs.close}
        data-dismiss="alert"
        aria-label="Close"
        onClick={onClose}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    }
  </div>
);

export default Alert;
