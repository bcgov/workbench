import * as React from 'react';
import Avatar from '@src/components/avatar';
import cx from 'classnames';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import Dropdown, { MenuItem } from '@src/components/dropdown';
import Icon from '@src/components/icon';
// import ForumUnreadBadge from '@src/modules/forums/containers/forum-unread-badge';
import Notifications from '@src/modules/notifications/components/appbar-notifications';
import SearchForm from '@src/modules/search/containers/search-form';
import { User } from '@src/modules/app/types';

const bs = require('@src/main.css');
import NavBarLink from './nav-bar-link';
// const styles = require('./styles.css');

export interface AppBarProps {
  user: User;
}

const AppBar: React.SFC<AppBarProps & RouteComponentProps<AppBarProps>> = ({
  match,
  location,
  user,
}) => {
  return (
    <div
      className={cx(bs.navbar, bs.navbarExpandLg, bs.navbarDark, bs.bgPrimary)}
      style={{ height: 58 }}
    >
      <Link to={match.url} className={bs.navbarBrand}>
        <img
          src="assets/images/bc-gov-icon-logo.png"
          width={45}
          height={30}
          className={bs.mr2}
        />
        DIP Workbench
      </Link>
      <div className={bs.navbarCollapse}>
        <nav className={cx(bs.navbarNav, bs.mrAuto)}>
          <NavBarLink icon="external-link-alt" location={location} url="/quicklinks">
            Quick Links
          </NavBarLink>
          {/* <NavBarLink icon="list-alt" url="/datasets" location={location}>
            Dataset Metadata
          </NavBarLink>
          <NavBarLink icon="comments" location={location} url="/discussions">
            Project Team Discussion
          </NavBarLink> */}
          {/* <NavBarLink icon="comments" location={location} url="/codesharing">
            Code Sharing
          </NavBarLink> */}
        </nav>
        <div className={cx(bs.dFlex, bs.alignItemsCenter, bs.navbarNav)}>
          {/* <Notifications /> */}
          {/* <SearchForm /> */}
          <div className={cx(bs.ml1, bs.dFlex, bs.alignItemsCenter)}>
            {/* <Link to="/help" className={cx(bs.navLink, bs.mr2)}>
              <Icon name="question-circle" size="2x" />
            </Link> */}
            <Dropdown
              alignRight
              buttonElement={
                <Avatar size="md" value={user.preferredUsername} />
              }
            >
              <MenuItem url="account">Account</MenuItem>
              <MenuItem onClick={() => window.open('logout', '_self')}>
                Logout
              </MenuItem>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(AppBar);
