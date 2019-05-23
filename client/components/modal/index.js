import React, { Component, cloneElement } from 'react';
import { createPortal } from 'react-dom';
import cx from 'classnames';

import Modal from './modal';
import bs from 'main.css';

const root = document.getElementById('portal-container');

class ModalWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  onOpenModal = () => {
    this.setState({
      open: true,
    });
  };

  onCloseModal = () => {
    const { onClose } = this.props;

    this.setState({
      open: false,
    });

    if (onClose) {
      onClose();
    }
  };

  render() {
    const { open } = this.state;
    const { buttonElement, children } = this.props;

    return (
      <div className={bs.dInlineBlock}>
        {open && (
          <Modal {...this.props} open onClose={this.onCloseModal}>
            {children}
          </Modal>
        )}
        {cloneElement(buttonElement, {
          onClick: this.onOpenModal,
        })}
      </div>
    );
  }
}

export default ModalWrapper;
