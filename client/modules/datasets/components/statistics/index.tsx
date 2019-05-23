import * as React from 'react';
/* import AutoSizer from 'react-virtualized/dist/es/AutoSizer';*/
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  GridCellProps,
  MultiGrid,
} from 'react-virtualized';
import cx from 'classnames';

import * as styles from './styles.css';
const bs = require('@src/main.css');

const stats = [
  '',
  'count',
  'unique',
  'top',
  'freq',
  'mean',
  'std',
  'min',
  '25%',
  '50%',
  '75%',
  'max',
];

class Statistics extends React.Component {
  readonly _cache = new CellMeasurerCache({
    defaultWidth: 200,
    fixedHeight: true,
  });

  cellRenderer = ({
    columnIndex,
    key,
    parent,
    rowIndex,
    style,
  }: GridCellProps) => {
    let content = Math.random().toString();

    if (columnIndex === 0) {
      content = stats[rowIndex];
    } else if (rowIndex === 0) {
      content = 'X Value';
    }

    return (
      <CellMeasurer
        cache={this._cache}
        columnIndex={columnIndex}
        key={key}
        parent={parent}
        rowIndex={rowIndex}
      >
        <div
          className={cx(styles.cell, {
            [styles.thead]: rowIndex === 0,
            [styles.fixedColumn]: columnIndex === 0,
            [styles.rowStriped]: rowIndex % 2 !== 0,
          })}
          style={style}
        >
          {content}
        </div>
      </CellMeasurer>
    );
  };

  render() {
    return (
      <div className={bs.dFlex} style={{ flex: 1 }}>
        <AutoSizer>
          {({ height, width }) => (
            <MultiGrid
              hideTopRightGridScrollbar
              hideBottomLeftGridScrollbar
              hideTopLeftGridScrollbar
              columnWidth={this._cache.columnWidth}
              cellRenderer={this.cellRenderer}
              columnCount={50}
              deferredMeasurementCache={this._cache}
              fixedColumnCount={1}
              fixedRowCount={1}
              height={height}
              rowHeight={48}
              rowCount={stats.length}
              style={{ border: '1px solid #f5f5f5' }}
              width={width}
            />
          )}
        </AutoSizer>
      </div>
    );
  }
}

export default Statistics;
