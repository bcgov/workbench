import * as React from 'react';
import cx from 'classnames';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';

import NewQuestion from '../new-question';
import Question from '../question';
import Questions from '../questions';
const bs = require('@src/main.css');

export interface DataProviderProps extends RouteComponentProps<any> { }

const DataProvider: React.SFC<DataProviderProps> = ({ match }) => {
  return (
    <div className={bs.bgLight} style={{ flex: 1, overflowY: 'auto' }}>
      <div className={cx(bs.container, bs.mt3)}>
        <Switch>
          <Route exact path={match.url} component={Questions} />
          <Route exact path={`${match.url}/new`} component={NewQuestion} />
          <Route path={`${match.url}/:questionId`} component={Question} />
        </Switch>
      </div>
    </div>
  );
};
export default DataProvider;
