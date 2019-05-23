import React, { Component } from 'react';
import cx from 'classnames';
import get from 'lodash/get';
import { NavLink } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import difference from 'lodash/difference';

import singleCategory from '../containers/single-category';
import Button from 'components/button';
import Dropdown, { MenuItem } from 'components/dropdown';
import Icon from 'components/icon';
import Posts from './posts';
import PostComposer from '../containers/post-composer';
import bs from 'main.css';

const Category = ({ dataset }) => dataset.title || '...';
const CategoryText = singleCategory(Category);

const headerStyle = cx(
  bs.p3,
  bs.border,
  bs.borderBottom,
  bs.dFlex,
  bs.flexColumn,
  bs.justifyContentBetween
);

class Topic extends Component {
  componentDidMount() {
    const { data, fetchTopic, match, subscribe } = this.props;
    const { topicId } = match.params;

    if (isEmpty(data) || isEmpty(data.posts)) {
      fetchTopic(topicId);
    }
  }

  componentDidUpdate(prevProps) {
    const { data, fetchStatus, fetchTopic, fetchPosts, match } = this.props;
    const { topicId } = match.params;

    if (prevProps.match.params.topicId !== topicId) {
      fetchTopic(topicId);
    }

    if (fetchStatus === 'loaded' && prevProps.fetchStatus !== 'loaded') {
      if (data.posts.length < data.stream.length) {
        fetchPosts(topicId, difference(data.stream, data.posts));
      }
    }
  }

  componentWillUnmount() {
    const { match, unsubscribe } = this.props;
    unsubscribe(`topic/${match.params.topicId}`);
  }

  onMenuSelect = value => {
    const { data, onDelete } = this.props;

    switch (value) {
      case 'delete':
        if (confirm('Are you sure you want to delete this topic?')) {
          onDelete(data.id);
        }
        break;

      default:
        return;
    }
  };

  render() {
    const { data, fetchPosts, fetchStatus, posts, match } = this.props;

    return (
      <div
        className={cx(bs.dFlex, bs.flexColumn)}
        style={{ minHeight: 0, flex: 1 }}
      >
        <header className={headerStyle} style={{ height: 100, borderWidth: 2 }}>
          <hgroup className={cx(bs.dFlex, bs.justifyContentBetween)}>
            <h5>{data.title}</h5>
            {false && (
              <Dropdown alignRight onSelect={this.onMenuSelect}>
                <MenuItem value="delete">
                  <span className={bs.textDanger}>Delete</span>
                </MenuItem>
              </Dropdown>
            )}
          </hgroup>
          <hgroup>
            <div className={cx(bs.dInlineBlock, bs.mr2)}>
              <Icon name="user" color="info" /> {data.participantCount}
            </div>
            <div className={cx(bs.dInlineBlock, bs.mx2)}>
              <Icon name="table" color="info" />{' '}
              <CategoryText id={data.categoryId} />
            </div>
          </hgroup>
        </header>
        <div className={bs.dFlex} style={{ minHeight: 0, flex: 1 }}>
          <Posts
            data={get(data, 'stream', [])}
            posts={posts}
            postsCount={get(data, 'postsCount', 0)}
            topicId={match.params.topicId}
            fetchPosts={fetchPosts}
            fetchStatus={fetchStatus}
          />
        </div>
        <PostComposer topicId={match.params.topicId} />
      </div>
    );
  }
}

export default Topic;
