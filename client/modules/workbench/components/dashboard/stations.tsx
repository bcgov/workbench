import * as React from 'react';
import cx from 'classnames';

import { IVirtualMachine } from '../../types';
import StationItem from './station-item';
const bs = require('@src/main.css');

export interface StationsProps {
  data: Array<IVirtualMachine>;
  url: string;
}

const Stations: React.SFC<StationsProps> = ({ data, url }) => (
  <div className={cx(bs.card, bs.my3)}>
    <div className={bs.cardHeader}>Stations</div>
    <div className={cx(bs.cardBody, bs.cardDeck)}>
      {data.map(d => <StationItem key={d.id} data={d} url={url} />)}
    </div>
  </div>
);

export default Stations;
