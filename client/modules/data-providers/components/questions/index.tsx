import * as React from 'react';
import Button from '@src/components/button';
import cx from 'classnames';
import Icon from '@src/components/icon';
import { Link, RouteComponentProps } from 'react-router-dom';

const bs = require('@src/main.css');

export interface QuestionsProps extends RouteComponentProps<any> { }

const Questions: React.SFC<QuestionsProps> = ({ match }) => {
  return (
    <div>
      <header className={cx(bs.dFlex, bs.alignItemsCenter, bs.my4)}>
        <p className={cx(bs.mr5, bs.mb0)}>
          Below are previously answered clarifications by the provider on the
          datasets. Check below to see if your query has been answered, and if
          not, submit a question.
        </p>
        <Button url={`${match.url}/new`}>
          <Icon name="plus-square" className={bs.mr2} />
          Ask New Question
        </Button>
      </header>
      <div className={bs.card}>
        <div className={bs.cardHeader}>
          <ul className={cx(bs.nav, bs.navPills, bs.cardHeaderPills)}>
            <li className={bs.navItem}>
              <a href="#" className={cx(bs.navLink, bs.active)}>
                <Icon name="check-circle" className={bs.mr2} />
                1 Unanswered Question
              </a>
            </li>
            <li className={bs.navItem}>
              <a href="#" className={bs.navLink}>
                <Icon solid name="check-circle" className={bs.mr2} />
                2 Answered Questions
              </a>
            </li>
          </ul>
        </div>
        <div className={cx(bs.listGroup, bs.listGroupFlush)}>
          <Link
            to={`${match.url}/123`}
            className={cx(bs.listGroupItem, bs.dFlex, bs.alignItemsCenter)}
          >
            <Icon name="check-circle" color="success" size="2x" />
            <span className={bs.ml3} style={{ flex: 1 }}>
              <small
                className={cx(bs.textMuted, bs.dFlex, bs.justifyContentBetween)}
              >
                <span>J. Jonah Jameson asked yesterday</span>
                <span>1 vendor reply</span>
              </small>
              <span className={bs.dBlock}>
                Question about the Hospital Visits data sources
              </span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Questions;
