import * as React from 'react';
import Button from '@src/components/button';
import cx from 'classnames';
import Icon from '@src/components/icon';
import { NavLink, Route, RouteComponentProps, Switch } from 'react-router-dom';

import Empty from './empty';
import Post from '../post';
import * as styles from './styles.css';
const bs = require('@src/main.css');

export interface AnnouncementsProps extends RouteComponentProps<any> { }

interface AnnouncementsState {
  open: boolean;
}
class Announcements extends React.Component<
  AnnouncementsProps,
  AnnouncementsState
  > {
  readonly state: AnnouncementsState = {
    open: true,
  };

  onToggleSidebar = () => this.setState({ open: !this.state.open });

  render() {
    const { match } = this.props;
    const { open } = this.state;

    return (
      <div className={styles.container}>
        {!open && (
          <Button
            className={styles.sidebarButton}
            size="sm"
            style="link"
            onClick={this.onToggleSidebar}
          >
            <Icon solid name="caret-right" color="muted" />
          </Button>
        )}
        <aside
          className={cx(styles.sidebar, bs.borderRight, {
            [bs.dNone]: !open,
          })}
        >
          <header
            className={cx(
              bs.p3,
              bs.dFlex,
              bs.alignItemsCenter,
              bs.justifyContentBetween
            )}
          >
            <h4
              className={cx(
                bs.small,
                bs.mb0,
                bs.fontWeightBold,
                bs.textMuted,
                bs.textUppercase
              )}
            >
              Sort By{' '}
              <span className={bs.textInfo}>
                Most Recent <Icon solid name="caret-down" />
              </span>
            </h4>
            <Button size="sm" style="link" onClick={this.onToggleSidebar}>
              <Icon solid name="caret-left" color="muted" />
            </Button>
          </header>
          <div
            className={cx(bs.listGroup, bs.listGroupFlush, styles.sidebarList)}
          >
            <NavLink
              to={`${match.url}/123`}
              activeClassName={bs.active}
              className={cx(
                bs.listGroupItem,
                bs.listGroupItemAction,
                bs.flexColumn
              )}
            >
              <small>July 3rd, 2018</small>
              <p>Introducing Weka Support</p>
            </NavLink>
            <NavLink
              to={`${match.url}/121`}
              activeClassName={bs.active}
              className={cx(
                bs.listGroupItem,
                bs.listGroupItemAction,
                bs.flexColumn
              )}
            >
              <small>July 3rd, 2018</small>
              <p>Planned Outage – Monday Feb 1, 2018 - 6:00AM - 8:00AM</p>
            </NavLink>
          </div>
        </aside>
        <div className={cx(bs.dFlex, styles.postContainer)}>
          <Switch>
            <Route exact path={match.url} component={Empty} />
            <Route exact path={`${match.url}/:postId`} component={Post} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Announcements;
