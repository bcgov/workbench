import * as React from 'react';
import cx from 'classnames';
import { match, NavLink } from 'react-router-dom';
import { Location } from 'history';

import * as styles from './styles.css';
const bs = require('@src/main.css');

export interface NavProps {
  children: React.ReactElement<NavLink>[] | React.ReactElement<NavLink>;
}

const Nav: React.SFC<NavProps> = ({ children }) => {
  return (
    <nav>
      <ul className={bs.nav}>
        {React.Children.map(children, component => (
          <li className={bs.navItem}>
            {React.cloneElement(component, {
              activeClassName: cx(bs.active, styles.active),
              className: cx(bs.navLink, bs.textDark),
            })}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
