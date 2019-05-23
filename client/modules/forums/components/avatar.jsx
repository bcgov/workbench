import React, { PureComponent } from 'react';
import cx from 'classnames';
import random from 'lodash/random';
import sample from 'lodash/sample';

import bs from 'main.css';

class Avatar extends PureComponent {
  render() {
    const { user, className, size } = this.props;
    const avatarPath = user.avatarTemplate.replace('{size}', size);
    const dimension = size / 2;
    const url = `http://dsc-sre-discourse.westus2.cloudapp.azure.com/${avatarPath}`;

    return (
      <div
        className={cx(className, bs.roundedCircle)}
        style={{
          width: dimension,
          height: dimension,
          background: '#e3e3e3',
        }}
      >
        <img
          src={url}
          width={dimension}
          height={dimension}
          className={bs.roundedCircle}
        />
      </div>
    );
  }
}

Avatar.defaultProps = {
  size: 90,
};

export default Avatar;
