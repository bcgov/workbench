import * as React from 'react';
import cx from 'classnames';
import Icon from '@src/components/icon';
import { NavLink, Route, RouteComponentProps, Switch } from 'react-router-dom';
import DataProvider from '@src/modules/data-providers/components/main';

import Nav from '@src/components/nav';
import Fields from './fields';
import Overview from './overview';
import Samples from './samples';
import Statistics from './statistics';
const bs = require('@src/main.css');

export interface DatasetProps extends RouteComponentProps<any> { }

class Dataset extends React.Component<DatasetProps> {
  render() {
    const { match } = this.props;

    return (
      <div className={cx(bs.dFlex, bs.flexColumn)} style={{ flex: 1 }}>
        <header className={cx(bs.pt3, bs.borderBottom)}>
          <div className={bs.container}>
            <div>
              <h2>
                <Icon solid name="database" color="muted" className={bs.mr2} />{' '}
                Hospital Visits
              </h2>
            </div>
            <Nav>
              <NavLink exact to={match.url}>
                Overview
              </NavLink>

              <NavLink to={`${match.url}/data-preview`}>Data Preview</NavLink>

              <NavLink to={`${match.url}/dataset-fields`}>
                Dataset Fields
              </NavLink>
              <NavLink to={`${match.url}/statistics`}>Statistics</NavLink>
              <NavLink to={`${match.url}/data-provider-questions`}>
                Data Provider Q&A
              </NavLink>
            </Nav>
          </div>
        </header>
        <Switch>
          <Route exact path={match.url} component={Overview} />
          <Route exact path={`${match.url}/data-preview`} component={Samples} />
          <Route
            exact
            path={`${match.url}/dataset-fields`}
            component={Fields}
          />
          <Route
            exact
            path={`${match.url}/statistics`}
            component={Statistics}
          />
          <Route
            path={`${match.url}/data-provider-questions`}
            component={DataProvider}
          />
        </Switch>
      </div>
    );
  }
}

export default Dataset;
