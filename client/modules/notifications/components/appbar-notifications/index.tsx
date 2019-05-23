import * as React from 'react';
import Avatar from '@src/components/avatar';
import cx from 'classnames';
import Icon from '@src/components/icon';
import { Link } from 'react-router-dom';
const bs = require('@src/main.css');

import * as styles from './styles.css';

interface AppbarNotificationsState {
  open: boolean;
}

class AppbarNotifications extends React.Component<
  {},
  AppbarNotificationsState
  > {
  readonly state: AppbarNotificationsState = {
    open: false,
  };

  componentDidMount() {
    document.addEventListener('click', this.onClickAway, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClickAway);
  }

  onClickAway = (event: React.MouseEvent) => {
    this.setState({
      open: false,
    });
  };

  onContainerClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  };

  render() {
    const { open } = this.state;

    return (
      <div
        onClick={this.onContainerClick}
        className={cx(bs.mr3, styles.container)}
      >
        <button
          className={cx(bs.btn, bs.btnLink, bs.textWhite, bs.positionRelative)}
          onClick={() => this.setState({ open: !open })}
        >
          <Icon solid name="bell" size="lg" />
          <span className={cx(bs.badge, bs.badgeDanger, styles.badge)}>2</span>
        </button>
        {open && (
          <div
            className={cx(bs.popover, bs.show, bs.bsPopoverBottom, bs.shadowLg)}
            role="tooltip"
            onClick={() => this.setState({ open: false })}
            x-placement="bottom"
            style={{
              position: 'absolute',
              top: 30,
              left: 0,
              transform: `translateX(-174px)`,
              width: 400,
              maxWidth: 400,
              willChange: 'transform',
            }}
          >
            <div className={bs.arrow} style={{ left: 'calc(50% - 16px)' }} />
            <div className={cx(bs.p0, bs.popoverBody)}>
              <div className={cx(bs.listGroup, bs.listGroupFlush)}>
                <Link
                  to="/discussions/123"
                  className={cx(
                    bs.listGroupItem,
                    bs.listGroupItemAction,
                    bs.dFlex,
                    bs.roundedTop
                  )}
                >
                  <div className={bs.mr3} style={{ width: 40 }}>
                    <Avatar value="P" size="md" />
                  </div>
                  <span className={cx(bs.dFlex, bs.flexColumn)}>
                    <small className={bs.textMuted}>
                      pft wrote 12 minutes ago in Air Quality
                    </small>
                    <h2 className={cx(bs.h6, bs.textInfo)}>
                      What regional variations in response time have you found?
                    </h2>
                    <p className={bs.mb0}>
                      <Icon solid name="circle" color="info" /> I finally got
                      the dataset to load…
                    </p>
                  </span>
                </Link>
                <div
                  className={cx(
                    bs.listGroupItem,
                    bs.fontWeightBold,
                    bs.textMuted,
                    bs.roundedBottom
                  )}
                >
                  Announcements (3)
                </div>
                <Link
                  to="/announcements/123"
                  className={cx(
                    bs.flexColumn,
                    bs.listGroupItem,
                    bs.listGroupItemAction
                  )}
                >
                  <small className={bs.textMuted}>July 3rd, 2018</small>
                  <h2 className={cx(bs.h6, bs.textInfo)}>
                    Introducing Weka Support
                  </h2>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default AppbarNotifications;
