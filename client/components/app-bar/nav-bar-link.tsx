import * as React from 'react';
import cx from 'classnames';
import Icon from '@src/components/icon';
import isEmpty from 'lodash/isEmpty';
import { Link, matchPath } from 'react-router-dom';
import { Location } from 'history';

const bs = require('@src/main.css');

export interface NavBarLinkProps {
  children: React.ReactNode;
  location: Location;
  icon: string;
  url: string;
}

const NavBarLink: React.SFC<NavBarLinkProps> = ({
  children,
  icon,
  location,
  url,
}) => (
    <li
      className={cx(bs.navItem, {
        [bs.active]: !isEmpty(
          matchPath(location.pathname, {
            path: url,
            exact: false,
            strict: false,
          })
        ),
      })}
    >
      <Link className={cx(bs.navLink, bs.positionRelative)} to={url}>
        <Icon solid name={icon} className={bs.mr2} />
        {children}
      </Link>
    </li>
  );

export default NavBarLink;
