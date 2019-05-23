import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

export interface VMProps { }

const VM: React.SFC<VMProps & RouteComponentProps<VMProps>> = () => (
  <div style={{ flex: 1, display: 'flex' }}>
    <iframe
      src="https://jupyterhub.b16d474.com"
      frameBorder={0}
      style={{ flex: 1 }}
      height="100%"
      width="100%"
    />
  </div>
);

export default VM;
