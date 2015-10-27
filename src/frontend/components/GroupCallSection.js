import React from 'react';
import Relay from 'react-relay';
import GroupCallList from './GroupCallList';
//import GroupCall from './GroupCall';
import GroupCallInvitationCreationForm from "./GroupCallInvitationCreationForm";
import {Paper, Styles, RaisedButton} from "material-ui";

export class GroupCallSection extends React.Component {

  styles = {
    container: {
      position: "relative"
    },

    sideBar: {
      display: "inline-block",
      width: 200,
      minHeight: "800px",
      border: "solid 1px " + Styles.Colors.grey300,
    },

    content: {
      display: "inline-block",
      verticalAlign: 'top'
    },
  }

  state = {
    isCreating: false
  }

  selectCall(callId) {
    this.setState({isCreating: false})
    this.props.relay.setVariables({callId});
  }

  selectCallCreation() {
    this.setState({isCreating: true})
    this.props.relay.setVariables({callId: null});
  }

  render() {
    var contentView = <div></div>;
/*    if (this.state.isCreating)
      contentView = <GroupCallInvitationCreationForm
        viewer={this.props.viewer} />
    else if (this.props.relay.variables.invitationId)
      contentView = <GroupCallInvitation
        groupCallInvitation={this.props.viewer.groupCallInvitation} />
        */

    return (
      <Paper style={this.styles.container}>
        <Paper zDepth={0} style={this.styles.sideBar}>
          <RaisedButton label="Create Call"
            fullWidth={true}
            primary={true}
            onTouchTap={() => this.selectCallCreation()} />
          <GroupCallList
            groupCallList={this.props.viewer.upcomingCallList}
            subheader="Upcoming calls"
            onSelect={(id) => this.selectCall(id)} />
          <GroupCallList
            groupCallList={this.props.viewer.pastCallList}
            subheader="Past calls"
            onSelect={(id) => this.selectCall(id)} />
        </Paper>
        <Paper zDepth={0} style={this.styles.content}>
          {contentView}
        </Paper>
      </Paper>
    )
  }
}

export default Relay.createContainer(GroupCallSection, {
  initialVariables: {
    callId: null
  },

  prepareVariables: (prev) =>
  {
    if (prev.callId)
      return {
        callId: prev.callId,
        fetchCall: true
      }
    else
      return {
        callId: "",
        fetchCall: false
      }
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        upcomingCallList:groupCallList(first:50, upcoming:true) {
          ${GroupCallList.getFragment('groupCallList')}
        }
        pastCallList:groupCallList(first:50, upcoming:false) {
            ${GroupCallList.getFragment('groupCallList')}
        }

      }
    `,
  },
});