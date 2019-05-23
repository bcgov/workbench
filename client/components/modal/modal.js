import React, { Component, cloneElement } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Button from 'components/button';
import styles from './styles.css';
import bs from 'main.css';

const root = document.getElementById('portal-container');

class Modal extends Component {
  render() {
    const {
      buttonElements,
      children,
      hideActionButtons,
      title,
      large,
      small,
      onClose,
      footer,
      open,
    } = this.props;

    if (open) {
      return createPortal(
        <div
          className={cx(
            bs.modal,
            bs.fade,
            bs.show,
            bs.dFlex,
            bs.alignItemsCenter,
            bs.justifyContentCenter
          )}
          tabIndex="-1"
          role="dialog"
          style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div
            className={cx(bs.modalDialog, {
              [bs.modalLg]: large,
              [bs.modalSm]: small,
            })}
            role="document"
          >
            <div className={bs.modalContent}>
              <div className={bs.modalHeader}>
                <h5 className={bs.modalTitle}>{title}</h5>
                {onClose && (
                  <button className={bs.close} onClick={onClose}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                )}
              </div>
              <div className={cx(bs.modalBody, styles.bodyContent)}>
                {children}
              </div>
              {!hideActionButtons && (
                <div className={bs.modalFooter}>
                  {buttonElements || <Button onClick={onClose}>Done</Button>}
                </div>
              )}
            </div>
          </div>
        </div>,
        root
      );
    }

    return null;
  }
}

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  large: PropTypes.bool,
  small: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Modal;
