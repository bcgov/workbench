import * as React from 'react';
import AppBar from '@src/components/app-bar';
import isEmpty from 'lodash/isEmpty';
import { Redirect, Route, Switch } from 'react-router-dom';
import Search from '@src/modules/search/containers/results';
import Session from '@src/modules/session/containers/session';
import Workbenches from '@src/modules/workbench/containers/workbenches';
import Quicklinks from '@src/modules/workbench/containers/quicklinks';
import Announcements from '@src/modules/announcements/components/announcements';
import Datasets from '@src/modules/datasets/components/datasets';
import Dataset from '@src/modules/datasets/components/dataset';
import Discussions from '@src/modules/discussions/components/discussions';
import Help from '@src/modules/help/components/help';
import Settings from '@src/modules/account/containers/settings';

import NotFound from './not-found';
import Sidebar from '../containers/sidebar';
import SignIn from './sign-in';
import { User } from '../types';
import * as styles from './styles.css';

export interface AppProps {
  fetchStatus: FetchStatus;
  fetchUser: () => any;
  user: User;
}

class App extends React.Component<AppProps> {
  componentDidMount() {
    const { fetchUser, user } = this.props;

    if (isEmpty(user)) {
      fetchUser();
    }
  }

  render() {
    const { fetchStatus, user } = this.props;

    return (
      <Session>
        <SignIn fetchStatus={fetchStatus}>
          <div className={styles.container}>
            <AppBar user={user} />
            <main className={styles.main}>
              <div className={styles.content}>
                <Switch>
                  <Redirect exact from="/" to="/quicklinks" />
                  <Route exact path="/datasets" component={Datasets} />{' '}
                  <Route path="/datasets/:datasetId" component={Dataset} />
                  <Route path="/search" component={Search} />
                  <Route path="/workbench" component={Workbenches} />
                  <Route path="/quicklinks" component={Quicklinks} />
                  <Route path="/discussions" component={Discussions} />
                  <Route path="/announcements" component={Announcements} />
                  <Route path="/help" component={Help} />
                  <Route path="/account" component={Settings} />
                  <Route path="*" component={NotFound} />
                </Switch>
              </div>
              <Route
                path="/(datasets|workbench)"
                render={() => <Sidebar user={user} />}
              />
            </main>
          </div>
        </SignIn>
      </Session>
    );
  }
}

export default App;
