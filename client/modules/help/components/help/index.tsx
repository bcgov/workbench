import * as React from 'react';
import cx from 'classnames';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';

const bs = require('@src/main.css');

import Main from '../main';
import Topic from '../topic';

export interface HelpProps extends RouteComponentProps<any> { }

const Help: React.SFC<HelpProps> = ({ match }) => {
  return (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <Switch>
        <Route exact path={match.url} component={Main} />
        <Route path={`${match.url}/:topicId`} component={Topic} />
      </Switch>
      <footer className={cx(bs.container, bs.my3, bs.pt2)}>
        <div className={cx(bs.borderTop, bs.row, bs.py3, bs.textMuted)}>
          <div className={bs.colSm6}>
            <small>
              Documentation Last Updated June 3, 2018<br />
              Contact via email help@idp-dev.com<br />
              Contact via phone (250) 555-5555
            </small>
          </div>
          <div className={cx(bs.colSm6, bs.textRight)}>
            <small>
              IDO Workbench Version <samp>{VERSION}</samp>
            </small>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Help;
