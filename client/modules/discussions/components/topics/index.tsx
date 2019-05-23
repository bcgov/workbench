import * as React from 'react';
import addHours from 'date-fns/addHours';
import Avatar from '@src/components/avatar';
import Button from '@src/components/button';
import {
  AutoSizer,
  Column,
  TableCellProps,
  WindowScroller,
} from 'react-virtualized';
import cx from 'classnames';
import formatDistance from 'date-fns/formatDistance';
import { Location } from 'history';
import Icon from '@src/components/icon';
import Nav from '@src/components/nav';
import { match, NavLink, RouteComponentProps } from 'react-router-dom';
import random from 'lodash/random';
import Table from '@src/components/table';

import SearchForm from './search-form';
import * as styles from './styles.css';
const bs = require('@src/main.css');

export interface TopicsProps extends RouteComponentProps<any> { }

class Topics extends React.Component<TopicsProps> {
  private scrollRef = React.createRef<HTMLDivElement>();
  state = {
    el: null,
  };

  componentDidMount() {
    this.setState({
      el: this.scrollRef.current,
    });
  }

  rowGetter = ({ index }: { index: number }) => {
    return {
      name: 'lorem ipsum dolor expoer',
      starred: true,
      lastPostedAt: addHours(new Date(), index - 1),
      postsCount: index < 3 ? 1 : random(0, 20),
    };
  };

  getRowClassName = ({ index }: { index: number }) =>
    index >= 0 && index < 3 ? bs.bgLight : '';

  nameCellRenderer = ({ cellData, rowIndex, rowData }: TableCellProps) => {
    const iconColor = rowData.starred ? 'warning' : 'muted';

    if (rowIndex < 3) {
      return (
        <div
          className={cx(bs.dFlex, bs.justifySpaceBetween, bs.alignItemsCenter)}
        >
          <Icon
            solid
            fixedWidth
            name="thumbtack"
            color="primary"
            className={bs.mr3}
          />
          <span className={bs.textTruncate}>{cellData}</span>
        </div>
      );
    }

    return (
      <div
        className={cx(bs.dFlex, bs.justifySpaceBetween, bs.alignItemsCenter)}
      >
        <Icon
          fixedWidth
          solid={rowData.starred}
          name="star"
          color={iconColor}
          className={bs.mr3}
        />
        <span className={bs.textTruncate}>{cellData}</span>
        {rowIndex > 3 &&
          rowIndex < 6 && (
            <span className={cx(bs.badge, bs.badgeWarning, bs.ml2)}>
              <Icon solid name="asterisk" color="white" /> New Post
            </span>
          )}
      </div>
    );
  };

  dateCellRenderer = ({ cellData }: TableCellProps) => {
    const date = formatDistance(cellData, new Date(), { includeSeconds: true });
    return `${date} ago`;
  };

  participantsCellRenderer = () => {
    return (
      <div>
        <Avatar size="sm" value="E" /> <Avatar size="sm" value="X" />{' '}
        <Avatar size="sm" value="K" />
      </div>
    );
  };

  onRowClick = () => {
    const { history, match } = this.props;
    history.push(`${match.url}/123`);
  };

  isActive = (filter?: string) => (
    match: match<any>,
    location: Location
  ): boolean => {
    if (!filter && !location.search) {
      return true;
    }

    return location.search === `?filter=${filter}`;
  };

  render() {
    const { el } = this.state;
    const { match } = this.props;

    return (
      <div className={styles.container}>
        <header className={cx(bs.borderBottom)}>
          <div className={bs.container}>
            <div className={cx(bs.row, bs.mt4)}>
              <div className={bs.colSm8}>
                <h1 className={cx(bs.h3, bs.mb0)}>
                  <Icon
                    solid
                    name="comment"
                    color="secondary"
                    className={bs.mr2}
                  />
                  Project Team Discussion
                </h1>
              </div>
              <div className={cx(bs.colSm4, bs.textRight)}>
                <Button url={`${match.url}/new`}>
                  <Icon solid name="plus-square" className={bs.mr2} />Start New
                  Topic
                </Button>
              </div>
            </div>
            <div className={bs.row}>
              <div className={bs.colSm12}>
                <div className={cx(bs.alert, bs.alertInfo, bs.my3)}>
                  <strong>Note:</strong> All discussion between members on your
                  team is centralized in the Project Team Discussion.
                </div>
                <div
                  className={cx(
                    bs.dFlex,
                    bs.justifyContentBetween,
                    bs.alignItemsCenter
                  )}
                >
                  <Nav>
                    <NavLink isActive={this.isActive()} to={match.url}>
                      All Topics{' '}
                      <span
                        className={cx(bs.badge, bs.badgeLight, bs.alignTextTop)}
                      >
                        31
                      </span>
                    </NavLink>
                    <NavLink
                      isActive={this.isActive('announcements')}
                      to={`${match.url}?filter=announcements`}
                    >
                      Announcements{' '}
                      <span
                        className={cx(bs.badge, bs.badgeLight, bs.alignTextTop)}
                      >
                        31
                      </span>
                    </NavLink>
                    <NavLink
                      isActive={this.isActive('starred')}
                      to={`${match.url}?filter=starred`}
                    >
                      Starred{' '}
                      <span
                        className={cx(bs.badge, bs.badgeLight, bs.alignTextTop)}
                      >
                        31
                      </span>
                    </NavLink>
                    <NavLink
                      isActive={this.isActive('new')}
                      to={`${match.url}?filter=new`}
                    >
                      New Topics{' '}
                      <span
                        className={cx(bs.badge, bs.badgeLight, bs.alignTextTop)}
                      >
                        31
                      </span>
                    </NavLink>
                    <NavLink
                      isActive={this.isActive('recent')}
                      to={`${match.url}?filter=recent`}
                    >
                      Recently Posted In{' '}
                      <span
                        className={cx(bs.badge, bs.badgeLight, bs.alignTextTop)}
                      >
                        31
                      </span>
                    </NavLink>
                  </Nav>
                  <div>
                    <SearchForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className={styles.topics} ref={this.scrollRef}>
          {el && (
            <WindowScroller scrollElement={el}>
              {({
                height,
                isScrolling,
                onChildScroll,
                registerChild,
                scrollTop,
              }) => (
                  <div className={bs.container}>
                    <AutoSizer disableHeight>
                      {({ width }) => (
                        <div ref={registerChild} style={{ flex: 1 }}>
                          <Table
                            autoHeight
                            height={height}
                            onRowClick={this.onRowClick}
                            rowClassName={this.getRowClassName}
                            rowGetter={this.rowGetter}
                            sortBy="name"
                            isScrolling={isScrolling}
                            onScroll={onChildScroll}
                            scrollTop={scrollTop}
                            width={width}
                          >
                            <Column
                              cellRenderer={this.nameCellRenderer}
                              dataKey="name"
                              flexGrow={2}
                              headerRenderer={() => 'Topic Name'}
                              width={300}
                            />
                            <Column
                              cellRenderer={this.dateCellRenderer}
                              dataKey="lastPostedAt"
                              headerRenderer={() => 'Last Posted At'}
                              width={200}
                            />
                            <Column
                              dataKey="postsCount"
                              headerRenderer={() => 'Posts Count'}
                              width={200}
                            />
                            <Column
                              cellRenderer={this.participantsCellRenderer}
                              dataKey="participants"
                              flexGrow={1}
                              headerRenderer={() => 'Participants'}
                              width={300}
                            />
                          </Table>
                        </div>
                      )}
                    </AutoSizer>
                  </div>
                )}
            </WindowScroller>
          )}
        </div>
      </div>
    );
  }
}

export default Topics;
