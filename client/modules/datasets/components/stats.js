import React from 'react';
import cx from 'classnames';
import times from 'lodash/times';

import bs from 'main.css';
import styles from './styles.css';

const HEADERS = [
  'field',
  'count',
  'distinct_values',
  'min',
  'max',
  'median',
  'mean',
];

const schemas = [];
times(10, n => schemas.push({ id: n }));

const Stats = () => (
  <div className={cx(bs.bgWhite)}>
    <table className={cx(bs.table, bs.tableResponsiveSm)}>
      <thead>
        <tr>
          {HEADERS.map(str => <th key={str}>{str}</th>)}
        </tr>
      </thead>
      <tbody>
        {schemas.map(schema =>
          <tr key={schema.id}>
            <td>
              <code>DATE_PST</code>
            </td>
            <td>
              11193335
            </td>
            <td>
              98082
            </td>
            <td>
              2001_01_01: 01:00,
            </td>
            <td>2017_11_11 12:13,</td>
            <td>n/a</td>
            <td>n/a</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default Stats;
