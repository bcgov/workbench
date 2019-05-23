import * as React from 'react';
import { AutoSizer } from 'react-virtualized';
import { Subtract } from 'utility-types';

export interface InjectedProps {
  width: number;
  height: number;
}

const withAutoSizer = <WrappedProps extends InjectedProps>(
  WrappedComponent: React.ComponentType<WrappedProps>
) => {
  type HocProps = Subtract<WrappedProps, InjectedProps> & {};

  return class AutoSizedTable extends React.Component<HocProps> {
    static displayName = `withAutoSizer(${WrappedComponent.name})`;
    static readonly WrappedComponent = WrappedComponent;

    render() {
      const { ...restProps } = this.props as {};

      return (
        <AutoSizer>
          {({ height, width }) => (
            <WrappedComponent height={height} width={width} {...restProps} />
          )}
        </AutoSizer>
      );
    }
  };
};

export default withAutoSizer;
