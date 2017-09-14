import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import DashboardModule from './DashboardModule';
import DashboardEditingModule from './DashboardEditingModule';

//dashboard for user(allows editing of all user information stored in Mongo)

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {editingInProgress: false, editingUserAttributes: false,
                  editingUserPersonal: false, editingUserSettings: false};
    this.editUserAttributes = this.editUserAttributes.bind(this);
    this.editUserPersonal = this.editUserPersonal.bind(this);
    this.editUserSetting = this.editUserSetting.bind(this);
    this.cancelUser = this.cancelUser.bind(this);
  }
  editUserSetting() {
    this.setState({editingInProgress: true, editingUserAttributes: false, editingUserPersonal: false, editingUserSettings: true});
  }
  editUserAttributes() {
    this.setState({editingInProgress: true, editingUserAttributes: true, editingUserPersonal: false, editingUserSettings: false});
  }
  editUserPersonal() {
    this.setState({editingInProgress: true , editingUserAttributes: false, editingUserPersonal: true, editingUserSettings: false});
  }
  cancelUser(){
    this.setState({editingInProgress: false, editingUserAttributes: false, editingUserPersonal: false, editingUserSettings: false});
  }
  renderunderRightContent() {
    return(
      <div className="rightUnderContainer">
        <div className="rightUnderLinks">
        <h4>Hub</h4>
        <hr/>
            <a className="btn btn-secondary btn-space" href="/createaccount">Nike</a>
            <a className="btn btn-secondary btn-space" href="/createaccount">adidas</a>
            <a className="btn btn-secondary btn-space" href="/createaccount">PUMA</a>
            <a className="btn btn-secondary btn-space" href="/createaccount">Under Armour</a>
            <a className="btn btn-secondary btn-space" href="/createaccount">New Balance</a>
            <a className="btn btn-secondary btn-space" href="/createaccount">Hummel</a>
            <a className="btn btn-secondary btn-space" href="/createaccount">Mizuno</a>
            <a className="btn btn-secondary btn-space" href="/createaccount">Umbro</a>
        </div>
      </div>
    );
  }
  render() {
    var dashboardDiv = "";
    return (
      <div>
        <div>
          <DashboardModule editUserAttributes={this.editUserAttributes} editUserPersonal={this.editUserPersonal} editUserSetting={this.editUserSetting} />
          <div style={{clear: 'both'}}></div>
          <div className="underLeft">
            <h3>Reviews</h3>
          </div>
          <div className="underRight">
            {this.renderunderRightContent()}
          </div>
        </div>
        <div className={!this.state.editingInProgress ? dashboardDiv = "dashboardDiv Hidden" : dashboardDiv = "dashboardDiv"}>&nbsp;</div>
        <div className="editingContainer">
        {this.state.editingUserAttributes || this.state.editingUserPersonal || this.state.editingUserSettings ? <DashboardEditingModule cancelUser={this.cancelUser}
         personal={this.state.editingUserPersonal}
         attribute={this.state.editingUserAttributes}
         setting={this.state.editingUserSettings}/> : <div></div>}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {authorizedUser: state.authorizedUser};
}

export default connect(mapStateToProps)(Dashboard);
