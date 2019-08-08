import * as React from 'react';
import Button from '@src/components/button';
import cx from 'classnames';
import Icon from '@src/components/icon';
import { Link, RouteComponentProps } from 'react-router-dom';

import { IVirtualMachine } from '../../types';
import CopyData from '../copy-data';
import LaunchLinks from '../../containers/links';
const bs = require('@src/main.css');

export interface QuicklinksProps {
  data: Array<IVirtualMachine>;
}

 
const Quicklinks: React.SFC<
QuicklinksProps & RouteComponentProps<QuicklinksProps>
  > = ({ data, match }) => (
    <div className={bs.container}>
      <div className={bs.row}>
        <div className={bs.colSm}>
          <LaunchLinks url={match.url} />
        </div>
      </div>
    </div>
  );
  
export default Quicklinks;
