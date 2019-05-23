import * as React from 'react';

const bs = require('@src/main.css');

export interface DialogFooterProps {
  children: React.ReactNode;
}

const DialogFooter: React.SFC<DialogFooterProps> = ({ children }) => {
  return <div className={bs.modalFooter}>{children}</div>;
};

export default DialogFooter;
