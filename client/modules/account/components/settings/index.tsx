import * as React from 'react';
import Button from '@src/components/button';
import cx from 'classnames';
import Icon from '@src/components/icon';
import LastSignIn from '@src/modules/session/containers/last-sign-in';
import { User } from '@src/modules/app/types';

const bs = require('@src/main.css');

export interface SettingsProps {
  data: User;
}

const Settings: React.SFC<SettingsProps> = ({ data }) => {
  return (
    <div className={bs.container}>
      <div className={cx(bs.row, bs.my5)}>
        <div className={bs.colSm12}>
          <header className={cx(bs.borderBottom, bs.mb3)}>
            <h1>Account Settings</h1>
          </header>
          <p>
            View or edit your personal information and view security
            information.
          </p>
        </div>
      </div>

      <div className={cx(bs.row, bs.mb5)}>
        <div className={bs.colSm12}>
          <header className={cx(bs.borderBottom, bs.mb3)}>
            <h2>
              <Icon solid name="user-circle" color="muted" className={bs.mr3} />
              Personal Information
            </h2>
          </header>
          <dl>
            <dt>Display Name</dt>
            <dd>{data.preferredUsername}</dd>
            <dt>Full Name</dt>
            <dd>{data.name}</dd>
            <dt>Email Address</dt>
            <dd>{data.email}</dd>
            <dt>
              Bio
              <Button
                size="sm"
                style="link"
                className={cx(bs.fontWeightBold, bs.ml3)}
              >
                <Icon solid name="edit" /> Edit
              </Button>
            </dt>
            <dd>
              <em className={bs.textMuted}>No bio added yet...</em>
            </dd>
          </dl>
        </div>
      </div>

      <div className={cx(bs.row, bs.mb5)}>
        <div className={bs.colSm12}>
          <header className={cx(bs.borderBottom, bs.mb3)}>
            <h2>
              <Icon solid name="lock" color="warning" className={bs.mr3} />
              Security Settings
            </h2>
          </header>
          <div className={cx(bs.alert, bs.alertInfo)}>
            <Icon solid name="user-clock" /> <LastSignIn />
          </div>
          <p className={bs.fontWeightBold}>
            If you suspect this was not you, please contact us immediately.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
