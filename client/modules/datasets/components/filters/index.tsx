import * as React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';

const bs = require('@src/main.css');

const Filters = () => {
  const sectionTextStyles = cx(
    bs.small,
    bs.fontWeightBold,
    bs.textUppercase,
    bs.textMuted
  );
  const items = [
    'All',
    'Corrections',
    'Health & Safety',
    'Environment',
    'Transportation',
  ];
  const tags = ['air quality', 'sports', 'wms', 'kml', 'geojson', 'hospital'];

  return (
    <React.Fragment>
      <form className={bs.my3}>
        <input
          className={cx(bs.formControl, bs.formControlSm)}
          placeholder="Search by keywords in metadata"
        />
      </form>
      <nav className={bs.mb3}>
        <h6 className={sectionTextStyles}>Data Providers</h6>
        <div className={cx(bs.nav, bs.flexColumn, bs.navPills)} role="tablist">
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
          <a
            href="#"
            className={cx(bs.navLink, bs.bgLight, bs.textCenter, bs.small)}
          >
            View All Providers
          </a>
        </div>
      </nav>
      <nav className={bs.mb3}>
        <h6 className={sectionTextStyles}>Tags</h6>
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
        <div className={cx(bs.nav, bs.flexColumn, bs.navPills)} role="tablist">
          <a
            href="#"
            className={cx(bs.navLink, bs.bgLight, bs.textCenter, bs.small)}
          >
            View All Providers
          </a>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Filters;
