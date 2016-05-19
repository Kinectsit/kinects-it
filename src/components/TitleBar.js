import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as actions from '../actions/actions';
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
    return (
      <div className="title-bar-container">
        <AppBar
          title="Kinects.It"
          onLeftIconButtonTouchTap={() => this.handleToggle()}
          style={{ position: 'fixed', textAlign: 'center' }}
          titleStyle={{ marginLeft: '-6%' }}
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({ open })}
        >
          <NavMenu
            onClick={() => this.handleClose()}
            isLoggedIn={this.props.isAuth}
            isHost={this.props.isHost}
          />
        </Drawer>
      </div>
    );
  }
}

TitleBar.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  isHost: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuth: state.authState.isAuthenticated,
    isHost: state.appState.isHost,
  };
}

export default connect(mapStateToProps)(TitleBar);
