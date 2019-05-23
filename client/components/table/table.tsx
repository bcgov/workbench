import * as React from 'react';
import { Table, TableProps } from 'react-virtualized';
import isFunction from 'lodash/isFunction';
import cx from 'classnames';

import * as styles from './styles.css';

export interface TableProps extends TableProps {
  stripped?: boolean;
}

const TableComponent: React.SFC<TableProps> = ({
  autoHeight,
  children,
  height,
  isScrolling,
  onRowClick,
  onScroll,
  rowClassName,
  rowGetter,
  scrollTop,
  sortBy,
  stripped = true,
  width,
}) => {
  return (
    <Table
      autoHeight={autoHeight}
      headerHeight={56}
      headerRowRenderer={({ className, columns, style }) => (
        <div className={cx(className, styles.thead)} role="row" style={style}>
          {columns}
        </div>
      )}
      height={height}
      isScrolling={isScrolling}
      onScroll={onScroll}
      onRowClick={onRowClick}
      rowClassName={({ index }) => {
        const additionalClasses = isFunction(rowClassName)
          ? rowClassName({ index })
          : '';
        return cx(styles.row, additionalClasses, {
          [styles.strippedRow]: index % 2 === 0 && stripped,
        });
      }}
      rowCount={1000}
      rowGetter={rowGetter}
      rowHeight={48}
      scrollTop={scrollTop}
      sortBy={sortBy}
      width={width}
    >
      {children}
    </Table>
  );
};

export default TableComponent;
