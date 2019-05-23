import * as React from 'react';
import Button from '@src/components/button';
import cx from 'classnames';
import Icon from '@src/components/icon';
import { Link } from 'react-router-dom';
import LastSignIn from '@src/modules/session/containers/last-sign-in';

import * as styles from './styles.css';
import { User } from '../../types';
import { timeOfDay } from './utils';
const bs = require('@src/main.css');

export interface SidebarProps {
  open: boolean;
  user: User;
  onToggleSidebarVisibility: () => any;
}

class Sidebar extends React.Component<SidebarProps> {
  render() {
    const { user, onToggleSidebarVisibility, open } = this.props;
    const sectionStyles = bs.borderBottom;
    const headerStyles = cx(bs.p3, bs.borderBottom);
    const contentStyles = bs.p3;
    const iconStyles = cx(bs.textMuted, bs.mr3);

    if (open) {
      return (
        <aside className={cx(styles.container, bs.borderLeft, bs.bgLight)}>
          <header
            className={cx(
              bs.pt2,
              bs.pb1,
              bs.px3,
              bs.borderBottom,
              bs.dFlex,
              bs.alignItemsCenter,
              bs.justifyContentBetween
            )}
          >
            <h4>Updates</h4>
            <Button
              style="link"
              className={bs.textMuted}
              onClick={onToggleSidebarVisibility}
            >
              <Icon solid name="times" />
            </Button>
          </header>
          <div className={sectionStyles}>
            <div className={contentStyles}>
              <p className={bs.mb0}>{`Good ${timeOfDay()}, ${
                user.givenName
                }`}</p>
              <small className={bs.textMuted}>
                <LastSignIn />
              </small>
            </div>
          </div>
          <div className={sectionStyles}>
            <header className={headerStyles}>
              <h5 className={bs.mb0}>
                <Link to="/announcements">
                  <Icon solid name="bullhorn" className={iconStyles} />{' '}
                  Announcements
                </Link>
              </h5>
            </header>
            <div className={contentStyles}>
              <ul className={bs.listUnstyled}>
                <li className={bs.mb2}>
                  <Link to="/announcements/123">
                    <small className={cx(bs.textMuted, bs.dBlock)}>
                      June 28th, 2018
                    </small>
                    Introducing Weka Support
                  </Link>
                </li>
                <li className={bs.mb2}>
                  <Link to="/announcements/123">
                    <small className={cx(bs.textMuted, bs.dBlock)}>
                      June 12th, 2018
                    </small>
                    Planned outage this weekend
                  </Link>
                </li>
                <li className={bs.mb2}>
                  <Link to="/announcements/123">
                    <small className={cx(bs.textMuted, bs.dBlock)}>
                      May 10th, 2018
                    </small>
                    Starter Workbenches are ready
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className={sectionStyles}>
            <header className={headerStyles}>
              <h5 className={bs.mb0}>
                <Link to="/datasets/123/data-vendor-questions">
                  <Icon solid name="question-circle" className={iconStyles} />{' '}
                  Data Provider Q&A
                </Link>
              </h5>
            </header>
            <div className={contentStyles}>
              <Link
                to="/datasets/123/data-provider-questions/1"
                className={cx(bs.dFlex, bs.alignItemsCenter, bs.mb3)}
              >
                <Icon
                  solid
                  name="check-circle"
                  color="success"
                  size="2x"
                  className={bs.mr2}
                />
                <span style={{ flex: 1 }}>
                  <small className={cx(bs.textMuted, bs.dBlock)}>
                    Today at 12:31pm
                  </small>
                  Question about Hospital Visits data sources
                </span>
              </Link>
              <Link
                to="/datasets/123/data-provider-questions/1"
                className={cx(bs.dFlex, bs.alignItemsCenter, bs.mb3)}
              >
                <Icon
                  solid
                  name="comment-dots"
                  color="muted"
                  size="2x"
                  className={bs.mr2}
                />
                <span style={{ flex: 1 }}>
                  <small className={cx(bs.textMuted, bs.dBlock)}>
                    Today at 12:31pm
                  </small>
                  Question about Hospital Visits data sources
                </span>
              </Link>
            </div>
          </div>
          <footer className={cx(styles.footer, bs.px3, bs.py2, bs.textRight)}>
            <small className={cx(bs.textMuted, bs.textMonospace)}>
              v{VERSION}
            </small>
          </footer>
        </aside>
      );
    }

    return (
      <button
        className={cx(
          styles.sidebarShowButton,
          bs.roundedLeft,
          bs.mt3,
          bs.textMuted,
          bs.bgLight
        )}
        onClick={onToggleSidebarVisibility}
      >
        <Icon solid name="bullhorn" />
      </button>
    );
  }
}

export default Sidebar;
