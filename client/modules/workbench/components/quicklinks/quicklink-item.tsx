import * as React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import { IVirtualMachine } from '../../types';
const bs = require('@src/main.css');

export interface StationItemProps {
  data: IVirtualMachine;
  url: string;
}

const LinkItem: React.SFC<StationItemProps> = ({ data, url }) => {
  if (window.__LINKS__[data.id] == "") {
    return false;
  }
  return (
    <a className={bs.card} style={{ width: 150 }} target="_blank" href={`${window.__LINKS__[data.id]}`} style={{padding:'20px'}}>
      <div className={cx(bs.cardBody, bs.pt0, bs.textCenter)}  >
        <span className={cs( 'fa-stack', 'fa-5x', bs.mb2 )} style={{ fontSize: '5vw' }}>
          <i className="fas fa-circle fa-stack-2x" style={{color:'#003366'}}></i>
          <i className={`${data.icon} fa-stack-1x`} style={{color:'white'}}></i>
        </span>
        <p className={cx(bs.cardText, bs.fontWeightBold)}>{data.name}</p>
        <p className={cx(bs.cardText)}>{data.description}</p>
      </div>
    </a>
)};

export default LinkItem;
