import * as React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import upperFirst from 'lodash/upperFirst';

const bs = require('@src/main.css');

export interface ButtonProps {
  block?: boolean;
  children: React.ReactNode;
  className?: any;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  outline?: Styles;
  role?: string;
  size?: 'sm' | 'lg';
  style?: Styles;
  type?: 'button' | 'link' | 'submit';
  url?: string;
}

const Button: React.SFC<ButtonProps> = ({
  children,
  style = 'primary',
  type = 'button',
  role = 'button',
  className = [],
  outline,
  block,
  size,
  disabled = false,
  onClick,
  url,
}) => {
  const classes = cx(
    bs.btn,
    {
      [bs[`btn${upperFirst(style)}`]]: !!style && !outline,
      [bs[`btnOutline${upperFirst(outline)}`]]: !!outline,
      [bs[`btn${upperFirst(size)}`]]: !!size,
      [bs.btnBlock]: block,
    },
    className
  );

  if (url) {
    return (
      <Link className={classes} to={url}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      role={role}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
