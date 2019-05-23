import * as React from 'react';
import formatRelative from 'date-fns/formatRelative';

export interface LastLoginTextProps {
  value: number;
}

const LastLoginText: React.SFC<LastLoginTextProps> = ({ value }) => {
  if (value) {
    const dateText = formatRelative(value * 1000, Date.now()); // Timestamps from auth need this
    return <>{`Your last login was ${dateText}`}</>;
  }

  return <>Welcome to IDO Workbench!</>;
};

export default LastLoginText;
