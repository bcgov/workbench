import React, { PureComponent } from 'react';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';
import CellMeasurer from 'react-virtualized/dist/es/CellMeasurer';
import CellMeasurerCache from 'react-virtualized/dist/es/CellMeasurer/CellMeasurerCache';
import InfiniteLoader from 'react-virtualized/dist/es/InfiniteLoader';
import List from 'react-virtualized/dist/es/List';
import has from 'lodash/has';
import isEqual from 'lodash/isEqual';

import Post from '../containers/post';

class Posts extends PureComponent {
  constructor(props) {
    super(props);
    this.cache = new CellMeasurerCache({
      fixedWidth: true,
      minHeight: 100,
    });
  }

  componentDidUpdate(prevProps) {
    const { data, posts } = this.props;

    if (!isEqual(prevProps.data, data) && this.list) {
      this.list.scrollToRow(data.length);
    }

    if (!isEqual(prevProps.posts, posts)) {
      this.cache.clearAll();
    }
  }

  isRowLoaded = ({ index }) => {
    const { data, posts } = this.props;
    const postId = data[index];

    return has(posts, postId);
  };

  fetchPosts = ({ startIndex, stopIndex }) => {
    const { data, fetchPosts, topicId } = this.props;

    fetchPosts(topicId, data.slice(startIndex, stopIndex));
  };

  rowRenderer = ({ index, key, parent, rowData, style }) => {
    const { data, fetchStatus } = this.props;
    const id = data[index];

    return (
      <CellMeasurer
        cache={this.cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
      >
        <Post id={id} style={style} topicFetchStatus={fetchStatus} />
      </CellMeasurer>
    );
  };

  render() {
    const { data, fetchStatus, posts, postsCount } = this.props;
    const totalRows = fetchStatus === 'loading' ? 20 : postsCount;

    return (
      <div
        ref={ref => (this.posts = ref)}
        style={{
          flex: 1,
          display: 'flex',
          minHeight: 'auto',
          overflow: 'hidden',
        }}
      >
        <InfiniteLoader
          isRowLoaded={this.isRowLoaded}
          loadMoreRows={this.fetchPosts}
          rowCount={totalRows}
        >
          {({ onRowsRendered, registerChild }) => (
            <AutoSizer>
              {({ width, height }) => (
                <List
                  height={height}
                  data={data}
                  deferredMeasurementCache={this.cache}
                  entities={posts}
                  onRowsRendered={onRowsRendered}
                  overscanRowCount={0}
                  ref={ref => {
                    this.list = ref;
                    return registerChild(ref);
                  }}
                  rowCount={totalRows}
                  rowHeight={this.cache.rowHeight}
                  rowRenderer={this.rowRenderer}
                  rowWidth={width}
                  width={width}
                />
              )}
            </AutoSizer>
          )}
        </InfiniteLoader>
      </div>
    );
  }
}

Posts.defaultProps = {
  data: [],
};

export default Posts;
