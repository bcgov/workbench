import * as React from 'react';
import cx from 'classnames';
import Icon from '@src/components/icon';
import { Link, RouteComponentProps } from 'react-router-dom';
import DatasetListItem from '@src/modules/datasets/components/dataset-list-item';

import Filters from './filters';
const bs = require('main.css');

export interface ResultsProps extends RouteComponentProps<any> {
  isLoading: boolean;
  onSearch: (state: any) => void;
  searchDatasets: (state: any) => void;
  term: string;
}

class Results extends React.Component<ResultsProps> {
  componentDidMount() {
    const { location, onSearch } = this.props;

    if (location.state) {
      onSearch(location.state);
    }
  }

  componentWillUpdate(nextProps: ResultsProps) {
    const { onSearch, term } = this.props;

    if (nextProps.location.state && nextProps.location.state !== term) {
      onSearch(nextProps.location.state);
    }
  }

  render() {
    const { isLoading, location } = this.props;

    return (
      <div className={bs.container}>
        <div className={cx(bs.row, bs.noGutters)}>
          <header className={cx(bs.col, bs.border, bs.borderBottom, bs.py3)}>
            <h4>Datasets</h4>
          </header>
        </div>
        <div className={cx(bs.row, bs.noGutters)}>
          <div className={cx(bs.col, bs.py3, bs.border, bs.borderBottom)}>
            <div
              className={cx(
                bs.dFlex,
                bs.alignItemsCenter,
                bs.justifyContentBetween
              )}
            >
              <p className={bs.mb0}>3 results</p>
              <div className={cx(bs.formRow, bs.row)}>
                <label className={cx(bs.colSm4, bs.colFormLabel)}>
                  Sort By
                </label>
                <div className={bs.colSm8}>
                  <select className={cx(bs.formControl, bs.formControlSm)}>
                    <option>Recently Updated</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={bs.row}>
          <div className={bs.col3}>
            <Filters />
          </div>
          <div className={bs.col9}>
            <DatasetListItem />
          </div>
        </div>
      </div>
    );
  }
}

export default Results;
