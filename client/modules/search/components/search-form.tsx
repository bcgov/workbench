import * as React from 'react';
import cx from 'classnames';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import Icon from '@src/components/icon';
import * as styles from './styles.css';
const bs = require('main.css');

export interface SearchFormProps extends RouteComponentProps<any> { }

interface SearchFormState {
  isFocused: boolean;
  value: string;
}

class SearchForm extends React.Component<SearchFormProps, SearchFormState> {
  readonly state: SearchFormState = {
    value: '',
    isFocused: false,
  };

  onSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
    const { history } = this.props;
    const { value } = this.state;

    event.preventDefault();
    history.push('/search', value);
    return false;
  };

  onClear = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    this.setState({
      value: '',
    });
  };

  render() {
    const { isFocused, value } = this.state;

    return (
      <form
        className={cx(bs.formInline, bs.mb0, styles.container)}
        onSubmit={this.onSubmit}
      >
        <div className={styles.searchIcon}>
          <Icon solid name="search" color={isFocused ? 'muted' : 'white'} />
        </div>
        <input
          className={cx(bs.formControl, bs.mrSm2, styles.input)}
          type="search"
          placeholder="Search dataset metadata and discussions"
          aria-label="Search"
          value={value}
          onBlur={() => this.setState({ isFocused: false })}
          onFocus={() => this.setState({ isFocused: true })}
          onChange={event => this.setState({ value: event.target.value })}
        />
        {value && (
          <div
            className={styles.closeIcon}
            onClick={this.onClear}
            role="button"
          >
            <Icon name="times-circle" color="muted" />
          </div>
        )}
      </form>
    );
  }
}

export default withRouter(SearchForm);
