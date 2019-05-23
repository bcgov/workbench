import React from 'react';
import cx from 'classnames';

import Card from './card';
import Icon from 'components/icon';
import bs from 'main.css';
import styles from './styles.css';

const getFileIcon = type => {
  switch (type) {
    case 'pdf':
      return 'file-pdf';
    default:
      return 'file-text';
  }
};

const Supplementary = ({ data = [] }) => (
  <Card title="Supplementary Metadata / Info">
    {!data.length && (
      <div className={cx(bs.textCenter, bs.textInfo, bs.my5)}>
        <Icon name="folder-open-o" size="3x" />
        <div>No supplementary content for this dataset.</div>
      </div>
    )}
    <div className={bs.cardDeck}>
      {data.map(file => (
        <div key={file.name} className={bs.card} style={{ maxWidth: 200 }}>
          <div className={cx(bs.cardImageTop, bs.textCenter, bs.py3)}>
            <Icon name={getFileIcon(file.type)} size="5x" color="primary" />
          </div>
          <div className={bs.cardBody}>
            <h5 className={cx(bs.cardTitle, bs.textCenter)}>{file.name}</h5>
            <p className={cx(bs.cardText, bs.dFlex, bs.justifyContentBetween)}>
              <small className={bs.textMuted}>{file.type}</small>
              <small className={bs.textMuted}>
                <a href={file.url} target="_blank">
                  <Icon name="download" /> Download
                </a>
              </small>
            </p>
          </div>
        </div>
      ))}
    </div>
  </Card>
);

export default Supplementary;
