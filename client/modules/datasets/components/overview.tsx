import * as React from 'react';
import cx from 'classnames';
import Button from '@src/components/button';
import Icon from '@src/components/icon';
import { Link } from 'react-router-dom';
import Tag from '@src/components/tag';

const bs = require('@src/main.css');
const tags = [
  'air pollution',
  'environmental',
  'monitoring',
  'ambient air quality',
  'particulates',
  'pollution',
];

const Overview: React.SFC = () => (
  <div className={bs.bgLight} style={{ flex: 1, overflowY: 'auto' }}>
    <div className={bs.container}>
      <div className={bs.row}>
        <div className={bs.colSm}>
          <div className={cx(bs.card, bs.my3)}>
            <div className={bs.cardHeader}>Dataset Description</div>
            <div className={bs.cardBody}>
              <p>
                The Hospital Visits dataset covers all hospital visit events in
                BC. The dataset does not contain any patient identifiers e.g.,
                name, place of birth, health number.
              </p>
              <dl className={bs.row}>
                <dt className={bs.colSm3}>Tags</dt>
                <dd className={bs.colSm9}>
                  {tags.map(d => <Tag key={d}>{d}</Tag>)}
                </dd>
                <dt className={bs.colSm3}>Data Provider</dt>
                <dd className={bs.colSm9}>MOH Performance Monitoring Branch</dd>
                <dt className={bs.colSm3}>Source</dt>
                <dd className={bs.colSm9}>
                  Hospitalization Warehouse Database
                </dd>
                <dt className={bs.colSm3}>Related Datasets</dt>
                <dd className={bs.colSm9}>
                  <ul className={cx(bs.listUnstyled, bs.mb0)}>
                    <li className={bs.listItem}>
                      <Link to="/datasets/456">
                        <Icon
                          solid
                          name="database"
                          className={bs.mr2}
                          color="muted"
                        />Geographic Locations of Hospitals{' '}
                        <span className={bs.textMuted}>
                          (loaded February 10th, 2018)
                        </span>
                      </Link>
                    </li>
                    <li className={bs.listItem}>
                      <Link to="/datasets/456">
                        <Icon
                          solid
                          name="database"
                          className={bs.mr2}
                          color="muted"
                        />Treatment codes{' '}
                        <span className={bs.textMuted}>
                          (loaded February 10th, 2018)
                        </span>
                      </Link>
                    </li>
                    <li className={bs.listItem}>
                      <a href="#">
                        <Icon
                          solid
                          name="caret-down"
                          color="muted"
                          className={bs.mr2}
                        />{' '}
                        See More
                      </a>
                    </li>
                  </ul>
                </dd>
              </dl>
            </div>
          </div>
          <div className={cx(bs.card, bs.my3)}>
            <div className={bs.cardHeader}>Supplementary Content</div>
            <div className={bs.cardBody}>
              <div
                className={cx(
                  bs.dFlex,
                  bs.alignItemsCenter,
                  bs.justifyContentBetween
                )}
              >
                <div className={cx(bs.ml2, bs.mr3)}>
                  <Icon solid name="file-pdf" size="2x" color="primary" />
                </div>
                <div style={{ flex: 1 }}>
                  <p className={cx(bs.fontWeightBold, bs.mb0)}>
                    {' '}
                    HEALTH SYSTEM MATRIX V8.0.pdf
                  </p>
                  <small className={bs.textMuted}>PDF File</small>
                </div>
                <div className={bs.ml3}>
                  <Button>View</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Overview;
