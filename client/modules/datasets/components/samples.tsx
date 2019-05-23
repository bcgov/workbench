import * as React from 'react';
import cx from 'classnames';
import { Column } from 'react-virtualized';
import { AutoSizedTable } from '@src/components/table';

import bs from '@src/main.css';

class Samples extends React.Component {
  componentDidMount() {
    /* const { datasetId, fetchSamples, projectId } = this.props;
             * this.props.fetchSamples(projectId, datasetId);*/
  }

  rowGetter = () => {
    return {
      name: Math.random(),
      starred: true,
      lastPostedAt: new Date(),
      postsCount: 10,
    };
  };

  render() {
    return (
      <div className={cx(bs.bgWhite)} style={{ flex: 1, overflow: 'hidden' }}>
        <AutoSizedTable rowGetter={this.rowGetter}>
          <Column
            dataKey="name"
            headerRenderer={() => 'Project Entity ID'}
            width={100}
            flexGrow={1}
          />
          <Column
            dataKey="name"
            headerRenderer={() => 'Age in Years'}
            width={100}
            flexGrow={1}
          />
          <Column
            dataKey="name"
            headerRenderer={() => 'Triage date/time'}
            width={100}
            flexGrow={1}
          />
          <Column
            dataKey="name"
            headerRenderer={() => 'Triage Level'}
            width={100}
            flexGrow={1}
          />
          <Column
            dataKey="name"
            headerRenderer={() => 'Registration Date/Time'}
            width={100}
            flexGrow={1}
          />
          <Column
            dataKey="name"
            headerRenderer={() => 'Physician Initial Assessment Date/Time'}
            width={100}
            flexGrow={1}
          />
          <Column
            dataKey="name"
            headerRenderer={() => 'Disposition Date/Time'}
            width={100}
            flexGrow={1}
          />
        </AutoSizedTable>
      </div>
    );
  }
}

export default Samples;
