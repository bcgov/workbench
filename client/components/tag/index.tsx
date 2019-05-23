import * as React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';

const bs = require('@src/main.css');

export interface TagProps {
  children: any;
  url?: string;
}

const Tag: React.SFC<TagProps> = ({ children, url }) => {
  const classes = cx(bs.badge, bs.badgeSecondary, bs.mr1);
  if (url) {
    return (
      <Link className={classes} to={url}>
        {children}
      </Link>
    );
  }

  return <span className={classes}>{children}</span>;
};

export default Tag;
