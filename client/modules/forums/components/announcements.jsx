import React, { Component } from 'react';
import cx from 'classnames';
import { Link, matchPath, NavLink, Redirect, Route } from 'react-router-dom';

import Announcement from '../containers/announcement';
import Auth from '../containers/auth';
import DateTime from 'components/date-time';
import Dropdown, { DropdownDivider, MenuItem } from 'components/dropdown';
import Icon from 'components/icon';
import bs from 'main.css';

class Announcements extends Component {
  componentDidMount() {
    this.props.fetchAnnouncements();
  }

  onProjectSelect = project => {
    window.open(`/${project}`, '_self');
  };

  render() {
    const { data, match } = this.props;
    const dashboardUrl = match.url.split('/')[1];

    return (
      <Auth>
        <div className={cx(bs.dFlex, bs.flexColumn)} style={{ flex: 1 }}>
          <header
            className={cx(
              bs.navbar,
              bs.navbarExpandSm,
              bs.navbarDark,
              bs.bgPrimary
            )}
            style={{ height: 58 }}
          >
            <Link to={match.url} className={bs.navbarBrand}>
              <img
                src="assets/images/bc-gov-icon-logo.png"
                width={45}
                height={30}
                className={bs.mr2}
              />
              <Dropdown
                showToggle
                buttonElement={<span>Announcements</span>}
                className={bs.dInlineBlock}
                onSelect={this.onProjectSelect}
              >
                <MenuItem value="air_quality_health">
                  Air Quality and Health
                </MenuItem>
                <MenuItem value="education_and_training">
                  Education Training and Relationship
                </MenuItem>
                <DropdownDivider />
                <MenuItem value="dsc">
                  Back to Data Science Challenge Website
                </MenuItem>
              </Dropdown>
            </Link>
          </header>
          <div className={cx(bs.dFlex)} style={{ flex: 1 }}>
            <aside
              className={cx(bs.bgWhite, bs.border, bs.borderRight)}
              style={{ width: 300, overflowY: 'auto' }}
            >
              <div className={(bs.listGroup, bs.listGroupFlush)}>
                {data.map((post, index) => (
                  <NavLink
                    key={post.id}
                    activeClassName={bs.active}
                    className={cx(bs.listGroupItem)}
                    to={`${match.url}/${post.id}`}
                  >
                    {matchPath(location.pathname, {
                      path: '/announcements',
                      exact: true,
                    }) &&
                      index === 0 && (
                        <Redirect to={`${match.url}/${post.id}`} />
                      )}
                    <small>
                      <DateTime date={post.createdAt} />
                    </small>
                    <h6>{post.title}</h6>
                  </NavLink>
                ))}
              </div>
            </aside>
            <div className={bs.bgWhite} style={{ flex: 1, overflowY: 'auto' }}>
              <Route path={`${match.url}/:postId`} component={Announcement} />
            </div>
          </div>
        </div>
      </Auth>
    );
  }
}

export default Announcements;
