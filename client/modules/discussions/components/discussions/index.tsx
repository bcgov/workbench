import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';

import Topics from '../topics';
import NewTopic from '../new-topic';
import Topic from '../topic';

export interface DiscussionsProps extends RouteComponentProps<any> { }

const Discussions: React.SFC<DiscussionsProps> = ({ match }) => (
  <Switch>
    <Route exact path={match.url} component={Topics} />
    <Route exact path={`${match.url}/new`} component={NewTopic} />
    <Route path={`${match.url}/:topicId`} component={Topic} />
  </Switch>
);

export default Discussions;
