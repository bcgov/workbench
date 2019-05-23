import * as React from 'react';
import Avatar from '@src/components/avatar';
import cx from 'classnames';
import Icon from '@src/components/icon';
import { Link } from 'react-router-dom';
import times from 'lodash/times';

import Sidebar from './sidebar';
import * as styles from './styles.css';
const bs = require('@src/main.css');

const Topic: React.SFC = () => (
  <div className={styles.container}>
    <div className={styles.topicContent}>
      <header className={bs.borderBottom}>
        <div className={cx(bs.container, bs.py3)}>
          <div className={bs.row}>
            <div
              className={cx(
                bs.h1,
                bs.mb0,
                bs.colSm1,
                bs.dFlex,
                bs.alignItemsCenter
              )}
            >
              <span className={cx(bs.badge, bs.badgeInfo, bs.mr3)}>
                <Icon solid name="comment" color="white" />
              </span>
            </div>
            <div className={bs.colSm11}>
              <small>
                <Link
                  to="/discussions"
                  className={cx(
                    bs.textUppercase,
                    bs.textMuted,
                    bs.fontWeightBold
                  )}
                >
                  <Icon solid name="angle-left" className={bs.mr2} />Back to
                  Topics
                </Link>
              </small>
              <h1 className={cx(bs.h3, bs.mb0)}>
                What regional variations in response time have you found?{' '}
                <Icon solid name="star" color="warning" />
              </h1>
              <small className={bs.textMuted}>
                Last post was 20 minutes ago
              </small>
            </div>
          </div>
        </div>
      </header>
      <div className={styles.posts}>
        <div className={bs.container}>
          {(() => {
            const elements = [];

            times(100, n => {
              elements.push(
                <div key={n} className={cx(bs.row, bs.my3)}>
                  <div className={bs.colSm1}>
                    <Avatar size="lg" value="J" />
                  </div>
                  <div className={bs.colSm10}>
                    <h3 className={bs.h6}>
                      J Jonah Jameson{' '}
                      <small className={bs.textMuted}>10:30am</small>
                    </h3>
                    <p>
                      Sed nisi lacus, sed viverra tellus in hac habitasse platea
                      dictumst vestibulum rhoncus est pellentesque elit
                      ullamcorper dignissim cras tincidunt lobortis feugiat.
                      Tortor posuere ac ut consequat semper viverra nam.
                    </p>
                  </div>
                  <div className={cx(bs.colSm1, bs.textRight)}>
                    <Icon solid name="ellipsis-v" color="muted" />
                  </div>
                </div>
              );
            });
            return elements;
          })()}
        </div>
      </div>
      <div className={cx(bs.positionSticky, bs.py3, styles.newPost)}>
        <div className={bs.container}>
          <div className={bs.row}>
            <div className={bs.colSm1}>
              <Avatar size="lg" value="o" />
            </div>
            <div className={bs.colSm10}>
              <div className={cx(bs.formGroup, bs.mb0)}>
                <textarea
                  className={bs.formControl}
                  placeholder="Write a post..."
                  rows={1}
                />
                <small
                  className={cx(
                    bs.formText,
                    bs.textMuted,
                    bs.dFlex,
                    bs.justifyContentBetween
                  )}
                >
                  <span>No file uploading allowed.</span>
                  <span>Enter to Send (Shift + Enter for new line)</span>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Sidebar />
  </div>
);

export default Topic;
