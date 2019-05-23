import React, { Component } from 'react';
import cx from 'classnames';
import isNull from 'lodash/isNull';

import bs from 'main.css';
import Button from 'components/button';
import Icon from 'components/icon';

class NewTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      value: '',
      datasetId: props.preloadedDatasetId || '',
    };
  }

  onDatasetSelect = event => {
    this.setState({
      datasetId: event.target.value,
    });
  };

  onSubmit = event => {
    const { body, datasetId, value } = this.state;
    const {
      categories,
      createTopic,
      datasets,
      location,
      projectId,
    } = this.props;
    let categoryId = null;

    event.preventDefault();

    if (location.state.isProject) {
      categoryId = projectId;
    } else {
      const dataset = datasets.find(d => d.id === datasetId);
      categoryId = categories.reduce((prev, c) => {
        if (!isNull(prev)) return prev;
        return c.name === dataset.name ? c.id : null;
      }, null);
    }

    if (value && body && categoryId) {
      createTopic(value, body, categoryId);
    }
  };

  render() {
    const { value, body, datasetId } = this.state;
    const {
      datasets,
      errors,
      location,
      postStatus,
      preloadedDatasetId,
    } = this.props;
    const isProject = location.state.isProject;
    const selectedDataset = datasets.find(d => d.id === datasetId) || {};
    // TODO: Switch this to a actual object validation library.
    const isValid =
      value.trim().length >= 1 &&
      body.trim().length >= 1 &&
      (isProject ? true : datasetId);
    const isPosting = postStatus === 'posting';
    const isButtonDisabled = !isValid || isPosting;
    const buttonLabel =
      postStatus === 'posting' ? 'Posting...' : 'Create Topic';

    return (
      <div
        className={cx(bs.dFlex, bs.alignItemsCenter, bs.justifyContentCenter)}
        style={{ flex: 1 }}
      >
        <form style={{ width: 500 }} onSubmit={this.onSubmit}>
          <h3>Start a New {isProject ? 'Project' : 'Dataset'} Topic</h3>
          {errors && (
            <div className={cx(bs.alert, bs.alertDanger)} role="t">
              {errors.map(err => <div key={err}>{err}</div>)}
            </div>
          )}
          <div className={bs.formGroup}>
            <label>Topic Title*</label>
            <input
              autoFocus
              type="text"
              className={cx(bs.formControl, bs.formControlLg)}
              placeholder="Type a new topic title here"
              disabled={isPosting}
              value={value}
              className={cx(bs.formControl, {
                [bs.isValid]: value.length >= 10,
              })}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <div className={bs.formGroup}>
            <label>Post*</label>
            <textarea
              className={cx(bs.formControl, {
                [bs.isValid]: body.length >= 20,
              })}
              value={body}
              disabled={isPosting}
              placeholder="Add the first post in this new topic"
              onChange={event => this.setState({ body: event.target.value })}
            />
          </div>
          {!isProject && (
            <div className={bs.formGroup}>
              <label>Dataset*</label>
              {preloadedDatasetId && (
                <input
                  readOnly
                  type="text"
                  className={cx(
                    bs.formControlPlaintext,
                    bs.formControlLg,
                    bs.w100
                  )}
                  value={selectedDataset.name}
                />
              )}
              {!preloadedDatasetId && (
                <select
                  className={cx(bs.formControl, bs.formControlLg, {
                    [bs.isValid]: datasetId,
                  })}
                  value={datasetId}
                  disabled={isPosting}
                  onChange={this.onDatasetSelect}
                >
                  <option value="">Select a Dataset</option>
                  {datasets.map(d => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              )}
              <small className={cx(bs.formText, bs.textMuted)}>
                Select a dataset to discuss. If unselected the topic will be
                moved to the project discussion category.
              </small>
            </div>
          )}
          <Button
            block
            size="lg"
            disabled={isButtonDisabled}
            style="success"
            type="submit"
          >
            {buttonLabel}
          </Button>
        </form>
      </div>
    );
  }
}

export default NewTopic;
