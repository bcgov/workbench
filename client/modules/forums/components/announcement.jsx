import React, { Component } from 'react';
import cx from 'classnames';

import DateTime from 'components/date-time';
import bs from 'main.css';

class Announcement extends Component {
  componentDidMount() {
    const { fetchPosts, match } = this.props;
    fetchPosts(match.params.postId);
  }

  componentDidUpdate(prevProps) {
    const { match, fetchPosts } = this.props;

    if (prevProps.match.params.postId !== match.params.postId) {
      fetchPosts(match.params.postId);
    }
  }

  render() {
    const { data, match, posts } = this.props;
    return (
      <article className={bs.mxAuto} style={{ maxWidth: 700 }}>
        <header className={cx(bs.my3, bs.pb3, bs.pxSm3, bs.pxMd0, bs.border, bs.borderBottom)}>
          <h1>
            {data.title}
          </h1>
          <div className={bs.textMuted}>
            Posted <DateTime date={data.createdAt} />
          </div>
        </header>
        {posts.map(post => (
          <div key={post.id} className={cx(bs.pxSm3, bs.pxMd0)}>
            <div dangerouslySetInnerHTML={{__html: post.cooked }} />
          </div>
        ))}
      </article>
    );
  }
}

export default Announcement;
