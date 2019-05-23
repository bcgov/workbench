import React from 'react';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';

import bs from 'main.css';
import { sidebarLinkStyle, activeStyle } from './classes';

function ProjectCategoryItem({ data, match }) {
  return (
    <NavLink
      to={`${match.url}/${data.id}`}
      className={sidebarLinkStyle}
      activeStyle={activeStyle}
    >
      {data.title}
      <span className={cx(bs.badge, bs.badgeLight, bs.badgePill)}>
        {data.topicsCount}
      </span>
    </NavLink>
  );
}

export default ProjectCategoryItem;
