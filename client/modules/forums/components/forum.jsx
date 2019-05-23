import React, { Component } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { NavLink, Switch, Route } from 'react-router-dom';

import Auth from '../containers/auth';
import Icon from 'components/icon';
import Button from 'components/button';
import NewTopic from '../containers/new-topic';
import Empty from './empty';
import Topic from '../containers/topic';
import Sidebar from '../containers/sidebar';
import bs from 'main.css';
import styles from './styles.css';

class Forums extends Component {
  componentDidMount() {
    this.props.fetchBootstrap();
  }

  render() {
    const { match, isBooted } = this.props;

    if (!isBooted) {
      return (
        <section
          className={cx(
            bs.dFlex,
            bs.justifyContentCenter,
            bs.alignItemsCenter,
            bs.bgWhite
          )}
        >
          Loading...
        </section>
      );
    }

    return (
      <Auth>
        <section
          className={cx(bs.dFlex, bs.flexRow, bs.bgWhite, styles.container)}
        >
          <Sidebar match={match} />
          <div
            className={cx(bs.dFlex, bs.flexColumn, bs.border, bs.borderLeft)}
            style={{ flex: 1, overflow: 'hidden' }}
          >
            <Switch>
              <Route exact path={match.url} component={Empty} />
              <Route path={`${match.url}/new`} component={NewTopic} />
              <Route path={`${match.url}/:topicId`} component={Topic} />
            </Switch>
          </div>
        </section>
      </Auth>
    );
  }
}

export default Forums;
