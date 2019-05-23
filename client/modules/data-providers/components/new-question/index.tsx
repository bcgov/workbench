import * as React from 'react';
import Button from '@src/components/button';
import cx from 'classnames';
import { RouteComponentProps } from 'react-router-dom';

const bs = require('@src/main.css');

export interface NewQuestionProps extends RouteComponentProps<any> { }

const NewQuestion: React.SFC<NewQuestionProps> = ({ history }) => (
  <div>
    <header className={bs.my4}>
      <h3>Ask a question to the Data Supplier</h3>
      <p>
        Enter your question in the textfield below. Other instructions about the
        process can go here.
      </p>
    </header>
    <div className={bs.card}>
      <div className={bs.cardHeader}>
        <ul className={cx(bs.nav, bs.navTabs, bs.cardHeaderTabs)}>
          <li className={bs.navItem}>
            <a className={cx(bs.navLink, bs.active)} href="#">
              Compose
            </a>
          </li>
          <li className={bs.navItem}>
            <a className={cx(bs.navLink)} href="#">
              Preview
            </a>
          </li>
        </ul>
      </div>
      <div className={bs.cardBody}>
        <form
          onSubmit={event => {
            event.preventDefault();
            history.goBack();
          }}
        >
          <div className={bs.formGroup}>
            <textarea
              className={bs.formControl}
              placeholder="Enter your question. Markdown is permitted."
            />
          </div>
          <div className={bs.textRight}>
            <Button
              className={bs.mr1}
              style="light"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                event.preventDefault();
                history.goBack();
              }}
            >
              Cancel
            </Button>
            <Button disabled type="submit">
              Ask Question
            </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default NewQuestion;
