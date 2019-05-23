import cx from 'classnames';

import bs from 'main.css';

export const sidebarLinkStyle = cx(
  bs.navLink,
  bs.dFlex,
  bs.justifyContentBetween,
  bs.alignItemsCenter,
  bs.textLight,
);

export const activeStyle = { backgroundColor: 'black' };
