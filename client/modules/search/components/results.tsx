import * as React from 'react';
import cx from 'classnames';
import Icon from '@src/components/icon';
import { Link, RouteComponentProps } from 'react-router-dom';
import DatasetListItem from '@src/modules/datasets/components/dataset-list-item';

import DiscussionItem from './discussion-item';

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
    const items = [
      'All',
      'Corrections',
      'Health & Safety',
      'Environment',
      'Transportation',
    ];
    const tags = ['air quality', 'sports', 'wms', 'kml', 'geojson', 'hospital'];

    return (
      <div className={bs.container}>
        <div className={cx(bs.row, bs.noGutters)}>
          <header className={cx(bs.col, bs.border, bs.borderBottom, bs.py3)}>
            <h4>
              {isLoading && (
                <Icon name="circle-o-notch" className={cx('fa-spin', bs.mr2)} />
              )}
              Search Results for{' '}
              <em className={bs.textPrimary}>{location.state}</em>
            </h4>
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
        <div className={cx(bs.row, bs.py3)}>
          <div className={bs.col3}>
            <nav className={bs.mb3}>
              <h6 className={cx(bs.textUppercase, bs.textMuted)}>
                Result Types
              </h6>
              <div
                className={cx(bs.nav, bs.flexColumn, bs.navPills, bs.mb3)}
                role="tablist"
              >
                <a
                  className={cx(bs.navLink, bs.active)}
                  href="#v-pills-home"
                  role="tab"
                >
                  All Types
                </a>
                <a className={bs.navLink} href="#v-pills-home" role="tab">
                  Dataset Metadata
                </a>
                <a className={bs.navLink} href="#v-pills-home" role="tab">
                  Discussions
                </a>
              </div>
              <h6 className={cx(bs.textUppercase, bs.textMuted)}>
                Data Providers
              </h6>
              <div
                className={cx(bs.nav, bs.flexColumn, bs.navPills)}
                role="tablist"
              >
                {items.map((d, index) => (
                  <a
                    key={d}
                    className={cx({
                      [bs.navLink]: true,
                      [bs.active]: index === 0,
                    })}
                    href="#v-pills-home"
                    role="tab"
                  >
                    {d}
                  </a>
                ))}
              </div>
            </nav>
            <nav className={bs.mb3}>
              <h6 className={cx(bs.textUppercase, bs.textMuted)}>Tags</h6>
              <div className={cx(bs.dFlex, bs.flexWrap)}>
                {tags.map(d => (
                  <Link
                    key={d}
                    to={`/datasets?tag=${d}`}
                    className={cx(bs.badge, bs.badgeLight, bs.mb2, bs.mr1)}
                  >
                    {d}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
          <div className={bs.col9}>
            <DatasetListItem />
            <DiscussionItem />
          </div>
        </div>
      </div>
    );
  }
}

export default Results;
