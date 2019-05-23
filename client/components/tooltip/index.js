import React, { Component } from 'react';
import cx from 'classnames';

import bs from 'main.css';

class Tooltip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  onMouseEnter = () => {
    this.setState({ show: true });
  }

  onMouseLeave = () => {
    this.setState({ show: false });
  }

  render() {
    const { show } = this.state;
    const {
      children,
      position,
      text
    } = this.props;

    return (
      <div
        style={{ position: 'relative' }}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <div
          className={cx(bs.tooltip, bs.fade, {
            [bs.show]: show,
            [bs.tooltipTop]: position === 'top',
            [bs.tooltipRight]: position === 'right',
            [bs.tooltipBottom]: position === 'bottom',
            [bs.tooltipLeft]: position === 'left',
          })}
          role="tooltip"
          style={{ width: 100, position: 'absolute' }}
        >
          <div className={bs.arrow}/>
          <div className={bs.tooltipInner}>
            {text}
          </div>
        </div>
        {children}
      </div>
    );
  }
}

Tooltip.defaultProps = {
  position: 'top'
};

export default Tooltip;
