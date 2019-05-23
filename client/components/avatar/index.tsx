import * as React from 'react';
import cx from 'classnames';
import get from 'lodash/get';
import random from 'lodash/random';
import sample from 'lodash/sample';

const bs = require('@src/main.css');

const letters: string = 'abcdefghijklmnopqrstuvwx';
const colors: string[] = ['Success', 'Warning', 'Dark', 'Danger', 'Info'];
const sizes = {
  sm: {
    dimensions: 20,
    fontSize: 14,
  },
  md: {
    dimensions: 40,
    fontSize: 18,
  },
  lg: {
    dimensions: 60,
    fontSize: 24,
  },
};
const dictionary: any = {};

export interface AvatarProps {
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
  size: 'sm' | 'md' | 'lg';
  value: string;
}

interface AvatarDefaultProps {
  readonly size: 'md';
}

class Avatar extends React.PureComponent<AvatarProps> {
  static defaultProps: AvatarDefaultProps = {
    size: 'md',
  };

  constructor(props: AvatarProps) {
    super(props);

    if (!dictionary[props.value]) {
      dictionary[props.value] = sample(colors);
    }
  }

  render() {
    const { className, onClick, size, value } = this.props;
    const dimensions = get(sizes, [size, 'dimensions']);
    const fontSize = get(sizes, [size, 'fontSize']);

    return (
      <div
        className={cx(
          bs[`bg${dictionary[value]}`],
          bs.textWhite,
          bs.roundedCircle,
          bs.dInlineFlex,
          bs.alignItemsCenter,
          bs.justifyContentCenter,
          bs.textUppercase,
          className
        )}
        onClick={onClick}
        style={{
          width: dimensions,
          height: dimensions,
          fontSize,
          lineHeight: fontSize,
          cursor: 'default',
        }}
      >
        {value ? value[0] : letters[random(letters.length - 1)]}
      </div>
    );
  }
}

export default Avatar;
