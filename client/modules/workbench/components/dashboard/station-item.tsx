import * as React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import { IVirtualMachine } from '../../types';
const bs = require('@src/main.css');

export interface StationItemProps {
  data: IVirtualMachine;
  url: string;
}

const StationItem: React.SFC<StationItemProps> = ({ data, url }) => (
  <Link className={bs.card} style={{ width: 150 }} to={`${url}/vm/${data.id}`}>
    <img
      className={bs.cardImgTop}
      src={data.logoImageUrl}
      alt={`${data.name} logo`}
    />
    <div className={cx(bs.cardBody, bs.pt0, bs.textCenter)}>
      <p className={cx(bs.cardText, bs.fontWeightBold)}>{data.name}</p>
    </div>
  </Link>
);

export default StationItem;
