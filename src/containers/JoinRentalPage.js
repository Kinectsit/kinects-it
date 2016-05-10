import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';

export class JoinRentalPage extends React.Component {

  componentDidMount() {
    this.props.actions.addRental('');
  }

  captureFormChange(event) {
    this.setState({
      rental: event.target.value,
    });
  }

  addRental() {
    this.props.actions.addRental(this.state.rental);
  }

  render() {
    return (
      <div>
        <h2>Join new rental</h2>
        <form>
          <input
            type="text"
            name="device"
            placeholder="New rental"
            onChange={(event) => this.captureFormChange(event)}
          />
          <button type="button" onClick={() => this.addRental()}>ADD RENTAL</button>
        </form>
        <h1>Current Rental is: {this.props.appState.houseName}</h1>
      </div>
    );
  }
}


JoinRentalPage.propTypes = {
  actions: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    appState: state.appState,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinRentalPage);

