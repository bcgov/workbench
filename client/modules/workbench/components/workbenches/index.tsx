import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';

import Dashboard from '../dashboard';
import VM from '../vm';

export interface WorkbenchesProps { }

class Workbenches extends React.Component<
  WorkbenchesProps & RouteComponentProps<WorkbenchesProps>
  > {
  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route exact path={match.url} component={Dashboard} />
        <Route path={`${match.url}/vm/:id`} component={VM} />
      </Switch>
    );
  }
}

export default Workbenches;
