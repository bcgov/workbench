import * as React from 'react';
import cx from 'classnames';

const bs = require('@src/main.css');

export interface DropdownProps {
  alignRight?: boolean;
  buttonElement: React.ReactNode;
  className?: string;
  showToggle?: boolean;
}

interface DropdownState {
  open: boolean;
}

class Dropdown extends React.Component<DropdownProps, DropdownState> {
  readonly state: DropdownState = {
    open: false,
  };

  componentDidMount() {
    document.addEventListener('click', this.onBlur);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onBlur);
  }

  onBlur = (event: Event) => {
    if (this.state.open) {
      event.preventDefault();
      event.stopPropagation();
      this.setState({
        open: false,
      });
    }
  };

  onToggle = (event: React.MouseEvent) => {
    event.preventDefault();
    event.nativeEvent.stopImmediatePropagation();

    this.setState({
      open: !this.state.open,
    });
  };

  render() {
    const { open } = this.state;
    const {
      alignRight,
      buttonElement,
      className,
      showToggle = false,
      children,
    } = this.props;

    return (
      <div className={cx(bs.dropdown, className)}>
        {React.cloneElement(buttonElement, {
          className: cx(buttonElement.props.className, {
            [bs.dropdownToggle]: showToggle,
            [bs.active]: open,
          }),
          onClick: this.onToggle,
        })}
        {open && (
          <div
            aria-labelledby="dropdownMenuLink"
            aria-expanded={open}
            className={cx({
              [bs.dropdownMenu]: true,
              [bs.dropdownMenuRight]: alignRight,
              [bs.show]: true,
            })}
          >
            {children}
          </div>
        )}
      </div>
    );
  }
}

export default Dropdown;
