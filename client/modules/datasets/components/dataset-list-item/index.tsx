import * as React from 'react';
import cx from 'classnames';
import Icon from '@src/components/icon';
import { Link } from 'react-router-dom';

const bs = require('@src/main.css');

export interface DatasetListItemProps { }

const DatasetListItem: React.SFC<DatasetListItemProps> = () => (
  <article className={cx(bs.borderBottom, bs.py3)}>
    <header
      className={cx(bs.dFlex, bs.alignItemsCenter, bs.justifyContentBetween)}
    >
      <h5>
        <Link to="/datasets/123">
          <Icon solid name="database" color="muted" className={bs.mr2} />{' '}
          Hospital Visits
        </Link>
      </h5>
      <small className={bs.textMuted}>
        Loaded <time>Feb 1, 2018</time>
      </small>
    </header>
    <p>
      The Hospital Visits dataset covers all hospital visit events in BC. The
      dataset does not contain any patient identifiers e.g., name, place of
      birth, health number.
    </p>
    <footer
      className={cx(bs.dFlex, bs.alignItemsCenter, bs.justifyContentBetween)}
    >
      <Link to="/datasets?filter=health" className={bs.textSuccess}>
        <Icon solid name="folder" /> Health & Safety
      </Link>
      <div className={cx(bs.dFlex, bs.justifyContentBetween)}>
        <Link to="/" className={cx(bs.badge, bs.badgeInfo, bs.ml1)}>
          hospital
        </Link>
        <Link to="/" className={cx(bs.badge, bs.badgeInfo, bs.ml1)}>
          ambulance
        </Link>
      </div>
    </footer>
  </article>
);

export default DatasetListItem;
