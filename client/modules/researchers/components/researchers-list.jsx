import React from 'react';
import cx from 'classnames';

import Avatar from 'modules/forums/containers/avatar';
import bs from 'main.css';

function ResearchersList({ data }) {
  return (
    <div>
      <ul className={bs.listUnstyled}>
        {
          data.map(user => (
            <li key={user.id} className={cx(bs.dFlex, bs.alignItemsCenter, bs.mb3)}>
              <Avatar userId={user.id} className={bs.mr3} size="60" />
              <div style={{ flex: 1 }}>
                {user.username}
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default ResearchersList;
