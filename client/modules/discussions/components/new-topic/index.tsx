import * as React from 'react';
import cx from 'classnames';
import Button from '@src/components/button';
import Icon from '@src/components/icon';

const bs = require('@src/main.css');

export interface NewTopicProps extends RouteComponentProps<any> { }

const NewTopic: React.SFC<NewTopicProps> = ({ history }) => (
  <div className={bs.container}>
    <header className={bs.my4}>
      <h1 className={bs.h3}>
        <Icon name="comment" color="muted" className={bs.mr2} />New Discussion
        Topic
      </h1>
      <p>
        Start a new discussion topic about anything relating to the project with
        your team.
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
          }}
        >
          <div className={bs.formGroup}>
            <label>Topic Title*</label>
            <input
              type="text"
              className={bs.formControl}
              placeholder=" Create a short and concise title describing the topic"
            />
          </div>
          <div className={bs.formGroup}>
            <label>Topic Post*</label>
            <textarea
              className={bs.formControl}
              placeholder="Add a short post describing the topic"
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
              Create Topic
            </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default NewTopic;
