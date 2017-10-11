import React, { Component } from 'react';
import DashboardModule from './DashboardModule';
import DashboardEditingModule from './DashboardEditingModule';
import DashboardReviewModule from './DashboardReviewModule';
import MessageBar from './MessageBar';
import $ from 'jquery';

//dashboard for user(allows editing of all user information stored in Mongo)

class Dashboard extends Component {

  componentDidMount(){
    $('html, body').css({
    overflow: 'auto',
    height: 'auto'
});
}

  constructor(props) {
    super(props);
    this.state = {editingInProgress: false, editingUserAttributes: false,
                  editingUserPersonal: false, editingUserSettings: false, editingAvatar: false};
    this.editUserAttributes = this.editUserAttributes.bind(this);
    this.editUserPersonal = this.editUserPersonal.bind(this);
    this.editUserSetting = this.editUserSetting.bind(this);
    this.cancelUser = this.cancelUser.bind(this);
    this.editAvatar = this.editAvatar.bind(this);
  }
  editUserSetting() {
    this.setState({editingInProgress: true,
                   editingUserAttributes: false,
                   editingUserPersonal: false,
                   editingUserSettings: true,
                   editingAvatar: false});
  }
  editUserAttributes() {
    this.setState({editingInProgress: true, editingUserAttributes: true,
                   editingUserPersonal: false, editingUserSettings: false,
                   editingAvatar: false});
  }
  editUserPersonal() {
    this.setState({editingInProgress: true , editingUserAttributes: false,
                   editingUserPersonal: true, editingUserSettings: false,
                   editingAvatar: false});
  }
  editAvatar(){
    console.log("editAvatar()");
    this.setState({editingInProgress: true , editingUserAttributes: false,
                   editingUserPersonal: false, editingUserSettings: false,
                   editingAvatar: true});
  }
  cancelUser(){
    this.setState({editingInProgress: false, editingUserAttributes: false,
                   editingUserPersonal: false, editingUserSettings: false,
                   editingAvatar: false});
  }
  renderunderRightContent() {
    return(
      <div className="rightUnderContainer">
        <div className="rightUnderLinks">
            <a className="btn btn-secondary btn-space" href="/boots/Nike">Nike</a>
            <a className="btn btn-secondary btn-space" href="/boots/Adidas">adidas</a>
            <a className="btn btn-secondary btn-space" href="/boots/Puma">PUMA</a>
            <a className="btn btn-secondary btn-space" href="/boots/UnderArmour">Under Armour</a>
            <a className="btn btn-secondary btn-space" href="/boots/NewBalance">New Balance</a>
            <a className="btn btn-secondary btn-space" href="/boots/Hummel">Hummel</a>
            <a className="btn btn-secondary btn-space" href="/boots/Mizuno">Mizuno</a>
            <a className="btn btn-secondary btn-space" href="/boots/Umbro">Umbro</a>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div>
        <MessageBar/>
        <div>
          <DashboardModule editUserAttributes={this.editUserAttributes} editUserPersonal={this.editUserPersonal}
                           editUserSetting={this.editUserSetting} editAvatar={this.editAvatar}/>
          <div className="cleared"></div>
          <div className="underLeft list-group">
            <DashboardReviewModule />
          </div>
          <div className="underRight">
            {this.renderunderRightContent()}
          </div>
        </div>
        <div className={!this.state.editingInProgress ? 'dashboardDiv Hidden' : 'dashboardDiv'}>&nbsp;</div>
        <div className="editingContainer">
          {this.state.editingUserAttributes || this.state.editingUserPersonal || this.state.editingUserSettings || this.state.editingAvatar ?
           <DashboardEditingModule cancelUser={this.cancelUser} personal={this.state.editingUserPersonal}
           attribute={this.state.editingUserAttributes} setting={this.state.editingUserSettings}
           editing={this.state.editingInProgress} avatar={this.state.editingAvatar}/> : <div></div>}
        </div>
      </div>
    );
  }
}

export default (Dashboard);
