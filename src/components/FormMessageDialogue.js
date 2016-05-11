import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export class FormMessageDialogue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const actions = [
      <FlatButton
        label="close"
        primary
        onTouchTap={() => this.handleClose()}
      />,
    ];
    return (
      <Dialog
        title={this.props.title}
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={() => this.handleClose()}
      >
         {this.props.children}
      </Dialog>
     );
  }
}

FormMessageDialogue.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.element,
  title: PropTypes.string.isRequired,
};
