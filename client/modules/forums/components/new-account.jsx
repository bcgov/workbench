import React, { Component } from 'react';
import get from 'lodash/get';
import merge from 'lodash/merge';
import cx from 'classnames';
import isEmpty from 'lodash/isEmpty';
import validate from 'validate.js';

import Button from 'components/button';
import Modal from 'components/modal';
import bs from 'main.css';

class NewAccount extends Component {
  state = {
    username: '',
    password: '',
  };

  clear = () => {
    this.props.onResetNewUserForm();
    this.setState({
      username: '',
      password: '',
    });
  };

  onSubmit = () => {
    this.props.onSubmit(this.state);
  };

  onCancel = () => {
    this.modal.onCloseModal();
    this.clear();
  };

  validate = () => {
    const { password, username } = this.state;
    const { errors, usernames } = this.props;
    let errs = {
      username: [],
      password: [],
    };

    const constraints = {
      username: {
        presence: true,
        length: {
          maximum: 20,
          minimum: 3,
        },
        exclusion: {
          within: usernames,
          message: '%{value} has already been taken',
        },
        format: {
          pattern: /^[a-zA-Z0-9_\-]+$/,
          message: 'Cannot contain spaces',
        },
      },
      presence: true,
      password: {
        length: {
          minimum: 10,
        },
      },
    };
    const validationErrors = validate(this.state, constraints);

    if (!isEmpty(validationErrors)) {
      errs = merge({}, errs, validationErrors);
    }

    if (!isEmpty(errors)) {
      errs = merge({}, errs, errors.errors);
    }

    return errs;
  };

  render() {
    const { password, username } = this.state;
    const { buttonElement, userStatus } = this.props;
    const errors = this.validate();
    const isRequesting = userStatus === 'requesting';
    const submitButtonText = isRequesting ? 'Registering...' : 'Submit';
    const hasUsernameErrors = !isEmpty(username) && errors.username.length > 0;
    const hasPasswordErrors = !isEmpty(password) && errors.password.length > 0;
    const isInvalid = hasUsernameErrors || hasPasswordErrors;
    const buttonElements = (
      <div>
        <Button style="default" onClick={this.onCancel}>
          Cancel
        </Button>{' '}
        <Button disabled={isInvalid || isRequesting} onClick={this.onSubmit}>
          {submitButtonText}
        </Button>
      </div>
    );

    return (
      <Modal
        ref={ref => (this.modal = ref)}
        buttonElement={buttonElement}
        buttonElements={buttonElements}
        title="Register for a Discusson Account"
      >
        <form onSubmit={event => event.preventDefault()}>
          {errors.email && (
            <div className={bs.textDanger}>{`Email ${
              this.props.errors.values.email
            } ${errors.email.join(',')}`}</div>
          )}
          <div className={bs.formGroup}>
            <label>Username</label>
            <input
              required
              className={cx(bs.formControl, {
                [bs.isInvalid]: hasUsernameErrors,
              })}
              disabled={isRequesting}
              placeholder="Username"
              type="text"
              value={username}
              onChange={event =>
                this.setState({ username: event.target.value })
              }
            />
            {hasUsernameErrors && (
              <small className={cx(bs.formText, bs.textDanger)}>
                {errors.username.join(',')}
              </small>
            )}
          </div>
          <div className={bs.formGroup}>
            <label>Password</label>
            <input
              required
              className={cx(bs.formControl, {
                [bs.isInvalid]: hasPasswordErrors,
              })}
              disabled={isRequesting}
              placeholder="Password"
              type="password"
              value={password}
              onChange={event =>
                this.setState({ password: event.target.value })
              }
            />
            {hasPasswordErrors && (
              <small className={cx(bs.formText, bs.textDanger)}>
                {errors.password}
              </small>
            )}
          </div>
        </form>
      </Modal>
    );
  }
}

export default NewAccount;
