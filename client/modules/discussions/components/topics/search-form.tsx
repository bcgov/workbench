import * as React from 'react';
import Button from '@src/components/button';
import cx from 'classnames';
import Icon from '@src/components/icon';

const bs = require('@src/main.css');

interface SearchFormState {
  open: boolean;
}

class SearchForm extends React.Component<void, SearchFormState> {
  readonly state = {
    open: false,
  };

  onSubmit = event => {
    event.preventDefault();
  };

  onToggle = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  render() {
    const { open } = this.state;

    if (open) {
      return (
        <form onSubmit={this.onSubmit}>
          <input
            className={cx(bs.formControl, bs.formControlSm)}
            placeholder="Search Topics"
          />
        </form>
      );
    }

    return (
      <Button onClick={this.onToggle} style="link">
        <Icon solid name="search" color="muted" />
      </Button>
    );
  }
}

export default SearchForm;
