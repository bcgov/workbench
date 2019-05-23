import * as React from 'react';
import Button from '@src/components/button';
import Dialog from '@src/components/dialog';
import DialogContent from '@src/components/dialog/content';
import DialogFooter from '@src/components/dialog/footer';
import DialogTitle from '@src/components/dialog/title';
import Icon from '@src/components/icon';

export interface CopyDataProps { }

interface CopyDataState {
  open: boolean;
}

class CopyData extends React.Component<CopyDataProps, CopyDataState> {
  readonly state = {
    open: false,
  };

  onClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    this.setState({
      open: true,
    });
  };

  onClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { open } = this.state;

    return (
      <React.Fragment>
        <Button size="sm" style="light" onClick={this.onClick}>
          <Icon solid name="copy" /> Copy Data
        </Button>
        <Dialog onClose={this.onClose} open={open}>
          <DialogTitle showClose>Copy Data</DialogTitle>
          <DialogContent>TBD</DialogContent>
          <DialogFooter>
            <Button onClick={this.onClose} style="primary">
              Done
            </Button>
          </DialogFooter>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default CopyData;
