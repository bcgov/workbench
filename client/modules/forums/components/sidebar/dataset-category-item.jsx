import React, { Component } from 'react';
import cx from 'classnames';
import { NavLink } from 'react-router-dom';

import Icon from 'components/icon';
import { sidebarLinkStyle, activeStyle } from './classes';
import bs from 'main.css';

class DatasetCategoryItem extends Component {
  componentWillUpdate(nextProps) {
    const { open, fetchCategory, categoryId } = this.props;

    if (nextProps.open && nextProps.open !== open) {
      fetchCategory(categoryId);
    }
  }

  onClick = () => {
    const { data, match, onToggle } = this.props;
    onToggle(data.id);
  };

  render() {
    const { data, dataset, match, open, topics } = this.props;
    const icon = open ? 'down' : 'right';
    const elements = [];

    elements.push(
      <div
        key="rootCategory"
        className={sidebarLinkStyle}
        onClick={this.onClick}
        style={{ cursor: 'pointer' }}
        role="button"
      >
        <span className={bs.textTruncate}>
          <Icon name={`caret-${icon}`} fixedWidth /> {dataset.title}
        </span>
      </div>
    );

    if (open) {
      topics.forEach(topic =>
        elements.push(
          <NavLink
            key={topic.id}
            to={`${match.url}/${topic.id}`}
            className={sidebarLinkStyle}
            activeStyle={activeStyle}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}
          >
            <span className={bs.ml4}>{topic.title}</span>
          </NavLink>
        )
      );
    }

    return elements;
  }
}

export default DatasetCategoryItem;
