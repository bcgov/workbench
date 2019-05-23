import React from 'react';
import cx from 'classnames';

import Avatar from '../containers/avatar';
import bs from 'main.css';
import Dropdown, { MenuItem } from 'components/dropdown';
import Edit from '../containers/edit';
import Icon from 'components/icon';
import TimeAgo from 'components/date-time/ago';
import DateTime from 'components/date-time';

import styles from './styles.css';

// NOTE: There is a sting replace for images,
function Post({
  data,
  deletePost,
  editing,
  editPost,
  fetchStatus,
  id,
  style,
  topicFetchStatus,
}) {
  const menuHandler = value => {
    switch (value) {
      case 'delete':
        deletePost(data.id, data.topicId);
        break;
      case 'edit':
        editPost(data.id, data.topicId);
        break;
    }
  };
  const content = data.cooked || '';
  const body = content.replace(/src=\"\/\//g, 'src="http://');
  const isLoading = fetchStatus === 'loading' || topicFetchStatus === 'loading';
  const isPostLoaded = fetchStatus === 'loaded';
  const loadingBackgroundColor = '#e3e3e3';
  const loadingTextHeight = 13;

  if (isLoading && !isPostLoaded) {
    return (
      <div className={cx(bs.dFlex, bs.p3, styles.post)} style={style}>
        <div className={bs.media} style={{ width: '100%' }}>
          <div
            className={cx(bs.roundedCircle, bs.mr3)}
            style={{
              width: 45,
              height: 45,
              background: loadingBackgroundColor,
            }}
          />
          <div className={bs.mediaBody}>
            <div
              className={bs.mb2}
              style={{
                width: 120,
                height: loadingTextHeight,
                background: loadingBackgroundColor,
              }}
            />
            <div
              className={bs.mb2}
              style={{
                width: '100%',
                height: loadingTextHeight,
                background: loadingBackgroundColor,
              }}
            />
            <div
              className={bs.mb2}
              style={{
                width: 420,
                height: loadingTextHeight,
                background: loadingBackgroundColor,
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cx(bs.dFlex, bs.p3, styles.post)} style={style}>
      <div className={bs.media} style={{ width: '100%' }}>
        <Avatar userId={data.userId} className={bs.mr3} />
        <div className={bs.mediaBody}>
          <div
            className={cx(
              bs.dFlex,
              bs.alignItemsCenter,
              bs.justifyContentBetween
            )}
          >
            <h6 className={bs.mt0}>
              {data.username}
              <small className={cx(bs.textMuted, bs.ml1)}>
                {data.updatedAt && (
                  <DateTime date={data.updatedAt} formatString="h:mm a" />
                )}
              </small>
              {data.createdAt !== data.updatedAt && (
                <Icon
                  name="pencil-square"
                  className={cx(bs.textMuted, bs.ml2)}
                />
              )}
              {fetchStatus === 'updating' && (
                <small className={bs.textMuted}>Updating....</small>
              )}
            </h6>
            {data.yours && (
              <Dropdown
                alignRight
                onSelect={menuHandler}
                className={styles.postMenu}
              >
                <MenuItem value="edit">Edit</MenuItem>
                {data.postNumber > 1 && (
                  <MenuItem value="delete">
                    <span className={bs.textDanger}>Delete</span>
                  </MenuItem>
                )}
              </Dropdown>
            )}
          </div>
          {editing && <Edit postId={data.id} />}
          {!editing && (
            <div
              className="Container"
              dangerouslySetInnerHTML={{ __html: body }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Post;
