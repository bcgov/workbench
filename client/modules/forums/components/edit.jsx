import React, { Component } from 'react';
import cx from 'classnames';

import Button from 'components/button';
import bs from 'main.css';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.original,
    };
  }

  componentDidMount() {
    const { fetchPost, original, postId } = this.props;

    if (!original) {
      fetchPost(postId);
    }
  }

  componentDidUpdate(prevProps) {
    const { original } = this.props;

    if (!prevProps.original && original) {
      this.setState({
        value: original,
      });
    }
  }

  onSubmit = (event) => {
    const { postId, savePost } = this.props;
    const { value } = this.state;

    event.preventDefault();
    savePost(postId, value);
  }

  render() {
    const { cancelEdit, fetchStatus, original } = this.props;
    const { value } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className={bs.formGroup}>
            <textarea
              autoFocus
              className={bs.formControl}
              disabled={!value || fetchStatus === 'updating'}
              placeholder="Loading content..."
              value={value}
              onChange={event => this.setState({ value: event.target.value })}
            />
            {original.length !== 0 && value.length < 20 &&
            <small className={cx(bs.formText, bs.textDanger)}>
              {`Post is ${20 - value.length} characters short`}
            </small>}
          </div>
          <div className={bs.textRight}>
            <Button style="default" onClick={cancelEdit}>Cancel</Button>
            {' '}
            <Button
              disabled={value.length < 20 || value === original}
              type="submit"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default Edit;
