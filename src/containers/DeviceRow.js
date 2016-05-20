import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { NavLink } from '../components/NavLink';
import FontIcon from 'material-ui/FontIcon';
import { List, ListItem } from 'material-ui/List';
import Badge from 'material-ui/Badge';
import kinectsitTheme from '../assets/kinectsitTheme';
import FolderIcon from 'material-ui/svg-icons/file/folder-open';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

export class DeviceRow extends React.Component {

  setFeatured() {
    this.props.actions.setFeatured(this.props.device);
  }

  render() {
    let active = 'Active';
    let buttonMessage = 'View Transactions';

    if (this.props.device.isactive === false) {
      buttonMessage = 'Purchase Usage';
      active = 'No';
    }

    let guestButton = (
      <NavLink to="/device">
        <RaisedButton className="device-button" label={buttonMessage} onClick={() => this.setFeatured()} />
      </NavLink>
    );

    if (this.props.appState.isHost) {
      return (
        <Card>
          <CardHeader
            title={this.props.device.name}
            subtitle="Subtitle"
            avatar="http://lorempixel.com/100/100/nature/"
          />
          <div>
            <li>Is Active: {active}</li>
            <NavLink to="/device-profile">
              <RaisedButton
                label="Device Options"
                onClick={() => this.setFeatured()}
              />
            </NavLink>
          </div>
        </Card>
      );
    }
    return (
      <Card className={'device-card '.concat(active === 'No' ? 'inactive' : 'active')}>
        <FontIcon
          className="material-icons"
        >
        widgets
        </FontIcon>
        <CardHeader
          className="device-header"
          title={this.props.device.name}
          actAsExpander
          showExpandableButton
        />
        <CardText expandable>
          <div key={this.props.device.id} className="device-description">
            <List className="description-list">
              <ListItem primaryText={'Name: '.concat(this.props.device.name)} />
              <ListItem primaryText={'Is Active: '.concat(active)} />
            </List>
          </div>
        </CardText>
        {guestButton}
      </Card>
    );
  }
}

DeviceRow.propTypes = {
  device: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceRow);

