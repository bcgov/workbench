import * as React from 'react';
import cx from 'classnames';

import { IVirtualMachine } from '../../types';
import QuicklinkItem from './quicklink-item';
const bs = require('@src/main.css');

export interface StationsProps {
  data: Array<IVirtualMachine>;
  url: string;
}

const Stations: React.SFC<StationsProps> = ({ data, url }) => (
  <div className={bs.my3} style={{border:0,padding:'20px'}}>
    <div className={bs.cardDeck} >
      {data.map(d => <QuicklinkItem key={d.id} data={d} url={url} />)}
    </div>
  </div>
);

export default Stations;
