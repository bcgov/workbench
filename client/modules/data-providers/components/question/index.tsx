import * as React from 'react';
import Avatar from '@src/components/avatar';
import Button from '@src/components/button';
import cx from 'classnames';
import Icon from '@src/components/icon';

const bs = require('@src/main.css');

const Question = () => (
  <div>
    <header className={bs.my4}>
      <h1 className={bs.h2}>Question about the Hospital Visits data sources</h1>
      <p className={cx(bs.textMuted, bs.dFlex, bs.alignItemsCenter)}>
        <span className={cx(bs.badge, bs.badgeSuccess, bs.mr2)}>
          <Icon solid name="check-circle" className={bs.mr2} />Answered
        </span>
        Question was submitted on Wednesday at 12:32pm
      </p>
    </header>
    <div>
      <div className={cx(bs.card, bs.borderSuccess)}>
        <div className={bs.cardBody}>
          <div className={cx(bs.dFlex, bs.alignItemsCenter, bs.mb3)}>
            <Icon solid name="smile" color="success" size="3x" />
            <div className={bs.ml3} style={{ flex: 1 }}>
              <h5 className={bs.cardTitle}>Data Provider Reply</h5>
              <h6 className={cx(bs.cardSubtitle, bs.textMuted)}>
                Today at 11:02am
              </h6>
            </div>
            <h5>
              <div className={cx(bs.badge, bs.badgeSuccess)}>
                <Icon solid name="certificate" className={bs.mr2} />Data
                Provider Answer
              </div>
            </h5>
          </div>
          <p>
            Nullam vehicula ipsum a arcu cursus. Facilisi cras fermentum, odio
            eu feugiat pretium, nibh ipsum consequat nisl, vel pretium lectus
            quam id leo in vitae turpis massa sed elementum tempus!
          </p>
          <p>
            Nullam vehicula ipsum a arcu cursus. Facilisi cras fermentum, odio
            eu feugiat pretium, nibh ipsum consequat nisl, vel pretium lectus
            quam id leo in vitae turpis massa sed elementum tempus!
          </p>
          <Button>
            <Icon solid name="reply" className={bs.mr2} />Reply
          </Button>
        </div>
      </div>
      <div className={cx(bs.card, bs.my3)}>
        <div className={cx(bs.cardHeader, bs.dFlex, bs.alignItemsCenter)}>
          <Avatar value="R" className={cx(bs.floatLeft, bs.mr2)} size="sm" />
          Ryan wrote today at 10:41am
        </div>
        <div className={bs.cardBody}>
          <p>
            Nullam vehicula ipsum a arcu cursus. Facilisi cras fermentum, odio
            eu feugiat pretium, nibh ipsum consequat nisl, vel pretium lectus
            quam id leo in vitae turpis massa sed elementum tempus!
          </p>
          <p>
            Nullam vehicula ipsum a arcu cursus. Facilisi cras fermentum, odio
            eu feugiat pretium, nibh ipsum consequat nisl, vel pretium lectus
            quam id leo in vitae turpis massa sed elementum tempus!
          </p>
        </div>
      </div>
      <div className={cx(bs.card, bs.my3)}>
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
          <form>
            <div className={bs.formGroup}>
              <textarea
                className={bs.formControl}
                placeholder="Write a reply or additional comment"
              />
            </div>
            <div className={bs.textRight}>
              <Button type="submit">Comment</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);

export default Question;
