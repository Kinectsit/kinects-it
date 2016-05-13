import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import { NavMenu } from './NavMenu';

class TitleBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    console.log('my props:', this.props);
    return (
      <div className="title-bar-container">
        <AppBar
          title="Kinects.It"
          onLeftIconButtonTouchTap={() => this.handleToggle()}
          style={{ position: 'fixed' }}
        />

        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({ open })}
        >
          <NavMenu onClick={() => this.handleClose()} isLoggedIn={this.props.isAuth} />
        </Drawer>

      </div>
    );
  }
}

TitleBar.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuth: state.authState.isAuthenticated,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps)(TitleBar);
