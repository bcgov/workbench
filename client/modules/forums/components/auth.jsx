import React, { Component } from 'react';
import cx from 'classnames';

import NewAccount from 'modules/forums/containers/new-account';
import Button from 'components/button';
import Icon from 'components/icon';
import bs from 'main.css';

class Auth extends Component {
  componentDidMount() {
    const { fetchUsers, userStatus } = this.props;

    if (userStatus === 'pending') {
      fetchUsers();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { fetchBootstrap, fetchUsers, userStatus } = this.props;

    if (
      nextProps.userStatus === 'authenticated' &&
      userStatus === 'requested'
    ) {
      fetchUsers();
      fetchBootstrap();
    }
  }

  render() {
    const { children, userStatus } = this.props;

    if (/(new|pending)/i.test(userStatus)) {
      return (
        <div
          className={cx(bs.dFlex, bs.justifyContentCenter, bs.alignItemsCenter)}
          style={{ flex: 1 }}
        >
          <div className={cx(bs.textCenter, bs.m5)}>
            <Icon name="lock" size="5x" color="warning" />
            <p>
              <strong>
                A discussion account wasn't generated and access isn't
                available.
              </strong>
              <br />Please contact an administrator to gain discussion access.
            </p>
          </div>
        </div>
      );
    }

    if (/(loading|requesting)/.test(userStatus)) {
      return (
        <div
          className={cx(bs.dFlex, bs.justifyContentCenter, bs.alignItemsCenter)}
          style={{ flex: 1, minHeight: 250 }}
        >
          <div className={cx(bs.textCenter, bs.textSecondary)}>
            <Icon spin fixedWidth name="refresh" size="2x" />
            <div>Loading...</div>
          </div>
        </div>
      );
    }

    return children;
  }
}

export default Auth;
