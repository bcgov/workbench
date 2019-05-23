import * as React from 'react';
import upperFirst from 'lodash/upperFirst';
import cx from 'classnames';

const bs = require('@src/main.css');

export interface IconProps {
  className?: string | Array<string>;
  color?: string;
  fixedWidth?: boolean;
  name: string;
  regular?: boolean;
  style?: any;
  size?: 'lg' | '2x' | '3x' | '4x' | '5x' | null;
  solid?: boolean;
  spin?: boolean;
}

const Icon: React.SFC<IconProps> = ({
  className = [],
  color,
  fixedWidth = false,
  name,
  regular,
  style = {},
  size,
  spin = false,
  solid,
}: IconProps) => (
    <i
      className={cx(
        {
          fas: solid,
          far: (!solid && !regular) || regular,
          [`fa-${name}`]: true,
          [`fa-${size}`]: !!size,
          'fa-spin': spin,
          [bs[`text${upperFirst(color)}`]]: !!color,
          'fa-fw': fixedWidth,
        },
        className
      )}
      style={style}
    >
      <span className={bs.srOnly}>{name}</span>
    </i>
  );

export default Icon;
