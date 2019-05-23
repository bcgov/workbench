import React, { Component } from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import Button from 'components/button';
import Dropdown, { MenuItem, DropdownDivider } from 'components/dropdown';
import Icon from 'components/icon';
import bs from 'main.css';

class DiscussionButton extends Component {
  onDiscussionSelect = (value) => {
    const { createCategory, dataset, history, match } = this.props;
    const projectURL = match.url.split('/')[1];

    if (value) {
      history.push(`/${projectURL}/discussions/${value}`);
    } else {
      createCategory(dataset.name);
      history.push(`/${projectURL}/discussions/new`, {
        dataset
      });
    };
  }

  render() {
    const { alignRight, topics } = this.props;
    const buttonElement = (
      <a
        href="#"
        className={cx({
          [bs.navLink]: !this.props.buttonElement,
        })}
        role="button"
      >
        {this.props.buttonElement || `Discuss (${topics.length})`}
      </a>
    );
    const menuItemElements = topics.map(topic => (
      <MenuItem key={topic.id} value={topic.id}>
        {topic.title}
      </MenuItem>
    ));

    const elements = menuItemElements.concat([
      <DropdownDivider key={'-'}/>,
      <MenuItem key="new">
        <Icon name="plus" /> Start New Discussion
      </MenuItem>
    ]);

    return (
      <Dropdown
        showToggle
        alignRight={alignRight}
        buttonElement={buttonElement}
        onSelect={this.onDiscussionSelect}
      >
        {elements}
      </Dropdown>
    );
  }
}

export default DiscussionButton;
