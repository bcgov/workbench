import React, { Component } from 'react';
import { Link, Route, Redirect, Switch } from 'react-router-dom';
import cx from 'classnames';
import isEmpty from 'lodash/isEmpty';

import Appbar from 'components/appbar';
import Announcements from 'modules/forums/containers/announcements';
import Button from 'components/button';
import Dashboard from '../containers/dashboard';
import Datasets from 'modules/datasets/containers/datasets';
import Dataset from 'modules/datasets/containers/dataset';
import Forums from 'modules/forums/containers/forum';
import Modal from 'components/modal/modal';
import Notebook from 'modules/notebooks/containers/notebook';
import Search from 'modules/search/containers/results';
import bs from 'main.css';
import styles from './styles.css';

class Project extends Component {
  componentDidMount() {
    const { match, fetchProject } = this.props;
    const { projectId } = match.params;

    if (!isEmpty(projectId) && projectId !== 'undefined') {
      fetchProject(projectId);
    }
  }

  componentDidUpdate(prevProps) {
    const { match, fetchProject } = this.props;
    const { projectId } = match.params;

    if (
      prevProps.match.params.projectId !== projectId &&
      projectId !== 'undefined'
    ) {
      fetchProject(projectId);
    }
  }

  render() {
    const { data, match } = this.props;
    const { projectId } = match.params;

    return (
      <div className={styles.container}>
        {projectId === 'undefined' && (
          <Modal open hideActionButtons title="Error">
            <p>
              An error has occured and you've been redirected without a project.
            </p>
            <p>Try opening one of these available projects</p>
            <ul>
              <li>
                <Button
                  style="link"
                  onClick={() => window.open('/air_quality_health', '_self')}
                >
                  Air Quality & Health
                </Button>
              </li>
              <li>
                <Button
                  style="link"
                  onClick={() =>
                    window.open('/education_and_training', '_self')
                  }
                >
                  Education & Training Relationships
                </Button>
              </li>
            </ul>
          </Modal>
        )}
        <Appbar project={data} match={match} />
        <main className={cx(bs.dFlex, bs.flexColumn, styles.main)}>
          <Switch>
            <Route
              exact
              path={`${match.url}/`}
              render={props => 'In progress'}
            />
            <Route exact path={`${match.url}/datasets`} component={Datasets} />
            <Route
              path={`${match.url}/datasets/:id`}
              render={props => <Dataset {...props} projectId={projectId} />}
            />
            <Route path={`${match.url}/discussions`} component={Forums} />
            <Route
              path={`${match.url}/search`}
              render={props => <Search {...props} projectId={projectId} />}
            />
            <Redirect exact from={`${match.url}/notebooks`} to="/" />
            <Route
              path={`${match.url}/notebooks/:notebookId`}
              component={Notebook}
            />
            <Route
              path={`${match.url}/announcements`}
              component={Announcements}
            />
            <Route render={() => '404 not found'} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default Project;
