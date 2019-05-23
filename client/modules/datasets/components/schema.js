import React, { Component } from 'react';
import cx from 'classnames';

import Card from './card';
import bs from 'main.css';
import styles from './styles.css';

const HEADERS = ['FIELD_NAME', 'DESCRIPTION', 'DATA_TYPE', 'FORMAT'];

class Schema extends Component {
  componentDidMount() {
    const { datasetId, fetchSamples, projectId } = this.props;
    this.props.fetchSamples(projectId, datasetId);
  }

  render() {
    const { data, dataset } = this.props;

    return (
      <div>
        <Card title={`${dataset.name} Fields`}>
          <table className={cx(bs.table, bs.tableResponsiveSm)}>
            <thead>
              <tr>{HEADERS.map(str => <th key={str}>{str}</th>)}</tr>
            </thead>
            <tbody>
              {data.map((schema, index) => (
                <tr key={index}>
                  <td>
                    <code>{schema.name}</code>
                  </td>
                  <td>{schema.description}</td>
                  <td>
                    <code>{schema.type}</code>
                  </td>
                  <td>{schema.format}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    );
  }
}

export default Schema;
