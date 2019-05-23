import * as React from 'react';
import { Link } from 'react-router-dom';

const bs = require('@src/main.css');

export interface MenuItemProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent) => void;
  url?: string;
}

const MenuItem: React.SFC<MenuItemProps> = ({ children, onClick, url }) => {
  if (url) {
    return (
      <Link to={url} className={bs.dropdownItem}>
        {children}
      </Link>
    );
  }
  return (
    <button className={bs.dropdownItem} onClick={onClick} type="button">
      {children}
    </button>
  );
};

export default MenuItem;
