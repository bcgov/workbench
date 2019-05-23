import React, { Component } from 'react';
import cx from 'classnames';
import TextareaAutosize from 'react-autosize-textarea';

import Button from 'components/button';
import Icon from 'components/icon';
import bs from 'main.css';

class PostComposer extends Component {
  onKeyPress = event => {
    const { nativeEvent } = event;
    const isEnterAction = nativeEvent.keyCode === 13 && !nativeEvent.shiftKey;

    console.log('enter!', isEnterAction);
    if (isEnterAction) {
      event.preventDefault();
      this.submit();
    }
  };

  onChange = event => {
    const { onChange } = this.props;
    onChange(event.target.value);
  };

  onSubmit = event => {
    event.preventDefault();
    this.submit();
  };

  submit = () => {
    const { value, postStatus, onSubmit, topicId } = this.props;

    if (value && postStatus !== 'posting') {
      onSubmit(value, topicId);
    }
  };

  render() {
    const { errors, postStatus, value } = this.props;
    const isInvalidLength = value.trim().length < 1;
    const iconName = isInvalidLength ? 'question-circle' : 'check';
    const iconColor = isInvalidLength ? null : 'success';
    const textAreaClasses = cx(bs.formControl, {
      [bs.isInvalid]: errors,
    });

    return (
      <div
        className={cx(bs.bgWhite, bs.positionRelative)}
        style={{ minHeight: 85 }}
      >
        <div className={bs.m3}>
          {errors && (
            <div
              className={cx(
                bs.positionAbsolute,
                bs.bgDanger,
                bs.textLight,
                bs.roundedTop
              )}
              style={{
                width: 'calc(100% - 2rem)',
                bottom: '100%',
                marginBottom: 'calc(-1rem - 4px)',
              }}
            >
              <div className={cx(bs.px3, bs.py1)}>
                {errors.map((error, index) => <div key={index}>{error}</div>)}
              </div>
            </div>
          )}
          <form className={bs.m0} onSubmit={this.onSubmit}>
            <div className={cx(bs.formGroup, bs.mb0)}>
              <TextareaAutosize
                autoFocus
                className={textAreaClasses}
                disabled={postStatus === 'posting'}
                onChange={this.onChange}
                onKeyPress={this.onKeyPress}
                placeholder="Write a Message..."
                ref={ref => (this.textField = ref)}
                rows={1}
                maxRows={5}
                style={{ borderWidth: 2, resize: 'none' }}
                value={value}
              />
              <small
                className={cx(
                  bs.formText,
                  bs.textMuted,
                  bs.dFlex,
                  bs.justifyContentBetween
                )}
              >
                <span>
                  <Icon name={iconName} color={iconColor} /> No file uploading
                  allowed.
                </span>
                <span>
                  {postStatus === 'posting'
                    ? 'Posting...'
                    : 'Enter to Send (Shift + Enter for new line)'}
                </span>
              </small>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default PostComposer;
