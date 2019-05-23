import React from 'react';
import cx from 'classnames';

import Card from './card';
import bs from 'main.css';
import styles from './styles.css';

const Schema = () => (
  <div>
    <Card title="code.py">
      <pre>
        <code>
          print "hi"
        </code>
      </pre>
    </Card>
    <Card title="helloworld.py">
      <pre>
        <code>
          print "hi"
        </code>
      </pre>
    </Card>
  </div>
);

export default Schema;
