import * as React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';

const dialogLayer = document.getElementById('dialog-layer');
const bs = require('@src/main.css');

export interface DialogProps {
  children: React.ReactNode;
  modal?: boolean;
  onClose?: () => void;
  open: boolean;
  size?: 'sm' | 'lg';
}

class Dialog extends React.Component<DialogProps> {
  readonly el = document.createElement('div');

  componentDidMount() {
    if (dialogLayer) {
      dialogLayer.appendChild(this.el);
    }
  }

  componentWillUnmount() {
    if (dialogLayer) {
      dialogLayer.removeChild(this.el);
    }
  }

  onBackdropClick = () => {
    const { modal, onClose } = this.props;

    if (!modal && onClose) {
      onClose();
    }
  };

  onDialogClick = (event: React.MouseEvent) => event.stopPropagation();

  render() {
    const { children, onClose, open, size } = this.props;
    const wrapper = open ? (
      <React.Fragment>
        <div className={cx(bs.modalBackdrop, bs.fade, bs.show)} />
        <div
          className={cx(bs.modal, bs.fade, bs.show, bs.dBlock)}
          tabIndex={-1}
          role="dialog"
          aria-hidden={open ? 'false' : 'true'}
          onClick={this.onBackdropClick}
        >
          <div
            className={cx(bs.modalDialog, bs.modalDialogCentered, bs.show, {
              [bs.modalLg]: size === 'lg',
              [bs.modalSm]: size === 'sm',
            })}
            role="document"
            onClick={this.onDialogClick}
          >
            <div className={bs.modalContent}>
              {React.Children.map(
                children,
                (component: React.ReactElement<any>) =>
                  React.cloneElement(component, {
                    onClose,
                  })
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    ) : null;

    return ReactDOM.createPortal(wrapper, this.el);
  }
}

export default Dialog;
