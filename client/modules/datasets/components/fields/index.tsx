import * as React from 'react';
import cx from 'classnames';
import { NavLink, RouteComponentProps } from 'react-router-dom';

const bs = require('@src/main.css');

export interface FieldsProps extends RouteComponentProps<any> { }

const Fields: React.SFC<FieldsProps> = ({ match }) => {
  return (
    <div className={bs.container}>
      <div className={bs.row}>
        <div className={bs.colSm3}>
          <form className={bs.my3}>
            <input
              className={cx(bs.formControl, bs.formControlSm)}
              placeholder="Filter list"
            />
          </form>
          <nav className={cx(bs.nav, bs.navPills, bs.flexColumn)}>
            <NavLink
              to={`${match.url}?id=1`}
              activeClassName={bs.active}
              className={cx(bs.navLink, bs.textMonospace, bs.small)}
            >
              Project Entity ID
            </NavLink>
            <NavLink
              to={`${match.url}?id=2`}
              activeClassName={bs.active}
              className={cx(bs.navLink, bs.small, bs.textMonospace)}
            >
              Project Entity ID
            </NavLink>
          </nav>
        </div>
        <div className={bs.colSm9}>
          <header className={bs.my3}>
            <h4>Conditions standard record layout</h4>
            <p>
              The ‘condition’ entity in the IDO corresponds to the ‘Conditions’
              entity in the CORNET system. Data on conditions form part of the
              condition data file for the IDO.Data capture for conditions: On
              receipt of a community authority document with conditions, the
              supervising probation office is responsible to enter information
              on each condition associated with the document.Note on scope:
              Conditions are only available on ‘community’ authority documents,
              not on temporary absence permits or custody documents.
            </p>
          </header>
          <div className={cx(bs.card, bs.mb3)}>
            <div
              className={cx(
                bs.cardHeader,
                bs.textMonospace,
                bs.textPrimary,
                bs.fontWeightBold
              )}
            >
              Project Entity ID
            </div>
            <div className={bs.cardBody}>
              <p className={bs.cardText}>
                A unique identifier that obscures the identity of an individual
                across projects.
              </p>
            </div>
            <ul className={cx(bs.listGroup, bs.listGroupFlush)}>
              <li
                className={cx(
                  bs.listGroupItem,
                  bs.dFlex,
                  bs.noGutters,
                  bs.textMonospace
                )}
              >
                <div className={cx(bs.colSm, bs.textInfo, bs.fontWeightBold)}>
                  Type
                </div>
                <div className={bs.colSm9}>UUID</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fields;
