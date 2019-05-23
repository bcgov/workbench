import React, { Component } from 'react';
import times from 'lodash/times';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import Auth from 'modules/forums/containers/auth';
import Alert from 'components/alert';
import Button from 'components/button';
import DateTime from 'components/date-time';
import DateTimeAgo from 'components/date-time/ago';
import DeferTimeout from './defer-timeout';
import EvaluateExport from './evaluate-export';
import LatestAnnouncements from 'modules/forums/containers/latest-announcements';
/* import Notebooks from 'modules/notebooks/containers/notebooks';*/
import RequestExport from './request-export';
import RecentDatasets from 'modules/datasets/containers/recent-datasets';
import RecentDiscussion from 'modules/forums/containers/recent';
import Researchers from 'modules/researchers/containers/researchers';
import Icon from 'components/icon';
import bs from 'main.css';
import styles from './styles.css';
import data from './data';

class Dashboard extends Component {
  render() {
    const { expiry, lastLogin, match, projectId, user } = this.props;
    const notebooksURL = `https://jupyterhub.b16d474.com/hub/oauth_login?next=https://jupyterhub.b16d474.com/user/${
      user.email
    }/tree/${projectId}`;

    return (
      <section id="Dashboard" className={bs.bgWhite}>
        <div className={cx(bs.dFlex, styles.content)}>
          <div className={cx(bs.dFlex, bs.flexColumn)} style={{ flex: 1 }}>
            <div className={cx(bs.border, bs.borderBottom)}>
              <header
                className={cx(bs.px3, bs.pt2, bs.border, bs.borderBottom)}
              >
                <h5>
                  <Icon name="comments" className={cx(bs.textMuted, bs.mr2)} />
                  <Link to={`${match.url}/discussions`}>
                    Recent Project Discussion
                  </Link>
                </h5>
              </header>
              <Auth>
                <RecentDiscussion match={match} />
              </Auth>
            </div>
            <div className={cx(bs.dFlex)} style={{ flex: 1 }}>
              <div
                className={cx(
                  bs.mw75,
                  bs.dFlex,
                  bs.flexColumn,
                  bs.border,
                  bs.borderRight
                )}
                style={{ flex: 1 }}
              >
                <header
                  className={cx(
                    bs.p3,
                    bs.border,
                    bs.borderBottom,
                    bs.bgLight,
                    bs.dFlex,
                    bs.alignItemsCenter,
                    bs.justifyContentBetween
                  )}
                >
                  <h5 className={bs.mb0}>
                    <Icon name="table" />{' '}
                    <Link to={`${match.url}/datasets`}>Datasets</Link>
                  </h5>
                </header>
                <div style={{ flex: 1, overflowY: 'auto' }}>
                  <RecentDatasets match={match} />
                </div>
              </div>
              <div
                className={cx(bs.mw75, bs.dFlex, bs.flexColumn)}
                style={{ flex: 1 }}
              >
                <header
                  className={cx(
                    bs.p3,
                    bs.border,
                    bs.borderBottom,
                    bs.bgLight,
                    bs.dFlex,
                    bs.justifyContentBetween
                  )}
                >
                  <h5 className={bs.mb0}>
                    <Icon name="pencil-alt" /> Notebooks
                  </h5>
                </header>
                <div style={{ flex: 1, overflowY: 'auto' }}>
                  <div className={bs.p3}>
                    <div
                      className={cx(
                        bs.textCenter,
                        bs.dFlex,
                        bs.alignItemsCenter,
                        bs.justifyContentCenter,
                        bs.my4
                      )}
                    >
                      <Icon name="code-branch" color="warning" size="5x" />
                      <Icon
                        name="arrow-right"
                        color="muted"
                        size="1x"
                        className={bs.mx4}
                      />
                      <Icon name="file-code" color="info" size="5x" />
                      <Icon
                        name="arrow-right"
                        color="muted"
                        size="1x"
                        className={bs.mx4}
                      />
                      <Icon name="chart-bar" color="success" size="5x" />
                    </div>
                    <h6>Fork, experiment, discover.</h6>
                    <p>
                      You can use notebooks to access challenge data files, do
                      your analysis, and submit your work.
                    </p>
                    <div className={bs.textCenter}>
                      <a
                        href={notebooksURL}
                        className={cx(bs.btn, bs.btnPrimary)}
                        target="_blank"
                      >
                        View My Project Notebooks{' '}
                        <Icon name="arrow-right" color="white" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={cx(
              styles.activityFeed,
              bs.border,
              bs.borderLeft,
              bs.textWhite,
              bs.bgSecondary
            )}
          >
            <header className={cx(bs.px3, bs.pt2)}>
              <h5>
                <Icon name="info-circle" /> Project Info
              </h5>
            </header>
            <hr className={bs.mt0} />
            <div className={bs.px3}>
              <dl className={bs.mb0}>
                <dt>Last login</dt>
                <dd>
                  <DateTime
                    date={user.authTime * 1000}
                    formatString="LLL do, YYYY @ hh:mmA"
                  />
                </dd>
                <dt className={cx(bs.listInlineItem, bs.mr3)}>
                  Account Expiry
                </dt>
                <dd>
                  <DateTimeAgo date={user.expires * 1000} />
                </dd>
              </dl>
            </div>
            <hr />
            <Auth>
              <LatestAnnouncements match={match} />
            </Auth>
            <hr />
            <header className={cx(bs.px3, bs.pt2)}>
              <h5>
                <Icon name="users" className={cx(bs.mr2, bs.textLight)} />{' '}
                Researchers
              </h5>
            </header>
            <div className={bs.p3}>
              <Researchers />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Dashboard;
