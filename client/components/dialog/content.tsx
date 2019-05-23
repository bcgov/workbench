import * as React from 'react';

const bs = require('@src/main.css');

export interface DialogContentProps {
  children: React.ReactNode;
}

const DialogContent: React.SFC<DialogContentProps> = ({ children }) => {
  return <div className={bs.modalBody}>{children}</div>;
};

export default DialogContent;
