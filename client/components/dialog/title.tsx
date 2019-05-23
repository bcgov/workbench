import * as React from 'react';

const bs = require('@src/main.css');

export interface DialogTitleProps {
  children: React.ReactNode;
  onClose?: () => void;
  showClose?: boolean;
}

const DialogTitle: React.SFC<DialogTitleProps> = ({
  children,
  showClose,
  onClose,
}) => {
  return (
    <div className={bs.modalHeader}>
      <h5 className={bs.modalTitle}>{children}</h5>
      {showClose && (
        <button
          type="button"
          className={bs.close}
          data-dismiss="modal"
          aria-label="Close"
          onClick={onClose}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      )}
    </div>
  );
};

export default DialogTitle;
