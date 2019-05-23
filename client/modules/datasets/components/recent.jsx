import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import random from 'lodash/random';

import Icon from 'components/icon';
import DiscussionButton from 'modules/forums/containers/discussion-button';
import bs from 'main.css';

const rowClassName = cx(
  bs.listGroupItem,
  bs.listGroupItemAction,
  bs.dFlex,
  bs.alignItemsCenter,
  bs.justifyContentBetween
);

function Recent({ data, categoryNames, match }) {
  return (
    <div className={cx(bs.listGroup, bs.listGroupFlush)}>
      {data.map(data => (
        <div key={data.title} className={rowClassName}>
          <Link to={`${match.url}/datasets/${data.id}`}>
            <span className={cx(bs.btnLink, bs.textTruncate)}>
              {data.title}
            </span>
          </Link>
          <div className={cx(bs.ml2, bs.textRight)} style={{ width: 80 }}>
            <DiscussionButton
              alignRight
              dataset={data}
              buttonElement={<Icon name="comments" />}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Recent;
