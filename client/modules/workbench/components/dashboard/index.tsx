import * as React from 'react';
import Button from '@src/components/button';
import cx from 'classnames';
import Icon from '@src/components/icon';
import { Link, RouteComponentProps } from 'react-router-dom';

import { IVirtualMachine } from '../../types';
import CopyData from '../copy-data';
import Stations from '../../containers/stations';
const bs = require('@src/main.css');

export interface DashboardProps {
  data: Array<IVirtualMachine>;
}

const Dashboard: React.SFC<
  DashboardProps & RouteComponentProps<DashboardProps>
  > = ({ data, match }) => (
    <div className={bs.container}>
      <div className={bs.row}>
        <div className={bs.colSm}>
          <div className={cx(bs.card, bs.my3)}>
            <div className={bs.cardHeader}>Project Data</div>
            <ul className={cx(bs.listGroup, bs.listGroupFlush)}>
              <div
                className={cx(
                  bs.listGroupItem,
                  bs.listGroupItemAction,
                  bs.dFlex,
                  bs.alignItemsCenter,
                  bs.justifyContentBetween
                )}
              >
                <Link to="/datasets/123">
                  <Icon solid name="database" className={bs.textMuted} /> Hospital
                  Visits
              </Link>
                <CopyData />
              </div>
              <div
                className={cx(
                  bs.listGroupItem,
                  bs.listGroupItemAction,
                  bs.dFlex,
                  bs.alignItemsCenter,
                  bs.justifyContentBetween
                )}
              >
                <Link to="/datasets/123">
                  <Icon solid name="database" className={bs.textMuted} /> Hospital
                  Sports Accidents
              </Link>
                <CopyData />
              </div>
            </ul>
          </div>
          <Stations url={match.url} />
        </div>
      </div>
    </div>
  );

export default Dashboard;
