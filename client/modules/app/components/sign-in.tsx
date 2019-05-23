import * as React from 'react';
import cx from 'classnames';
import Icon from '@src/components/icon';

const bs = require('@src/main.css');
const styles = require('./styles.css');

export interface SignInProps {
  children: React.ReactNode;
  fetchStatus: FetchStatus;
}

const SignIn: React.SFC<SignInProps<any>> = ({ children, fetchStatus }) => {
  if (fetchStatus === 'loading') {
    return (
      <div className={cx(styles.signInContainer, bs.bgPrimary)}>
        <div className={cx(bs.card, styles.signInCard)}>
          <div className={cx(bs.cardBody, bs.textCenter)}>
            <div>
              <img
                src="/assets/images/bc-gov-icon-logo.png"
                width={45}
                height={30}
                className={bs.mb2}
              />
            </div>
            <p>One moment while we sign you in...</p>
            <div>
              <Icon spin solid name="circle-notch" color="primary" size="2x" />
            </div>
          </div>
        </div>
      </div>
    );
  } else if (fetchStatus === 'failed') {
    return (
      <div className={cx(styles.signInContainer, bs.bgPrimary)}>
        <div
          className={cx(bs.card, bs.textWhite, bs.bgDanger, styles.signInCard)}
        >
          <div className={cx(bs.cardBody, bs.textCenter)}>
            <div className={bs.mb2}>
              <Icon solid name="exclamation-circle" size="2x" />
            </div>
            <p>Sign in failed</p>
            <a href="/login" className={cx(bs.btn, bs.btnOutlineLight)}>
              Try logging in again
            </a>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default SignIn;
