import React, { Children } from 'react';
import cx from 'classnames';

import bs from 'main.css';

const Card = ({
  title,
  children,
  style = {}
}) => (
  <div className={cx(bs.card, bs.mxAuto, bs.my5, bs.w75)} style={style}>
    {title && <h5 className={bs.cardHeader}>{title}</h5>}
    {
      children.type === 'table' ?
      children :
      <div className={bs.cardBody}> {children} </div>
    }
  </div>
);

export default Card;
