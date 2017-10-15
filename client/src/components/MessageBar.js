import React, {Component} from 'react';
import {connect} from 'react-redux';
import {clearMessage} from '../actions/index';

//Acts a message bar to user and operates on all Async requests
//will inform user of success/failure of logins, signups, etc.

class MessageBar extends Component {

  clearMessages(){
    setTimeout(() => {this.props.clearMessage()}, 2000);
  }

  renderBar()
  {
      let divclassName = '';
      let spanclassName = '';
      if(this.props.error) {

        if(this.props.error.message !== "Empty")
        {
              this.clearMessages();

              if(this.props.error.message.includes("Success")) {
              divclassName = "BarMessage success Shown";
              spanclassName= "fa fa-hand-spock-o btn-space Shown"
              }
              else {
              divclassName = "BarMessage error Shown";
              spanclassName= "fa fa-exclamation btn-space Shown"
        }
        }
        else {
          divclassName = "BarMessage success Hidden";
          spanclassName= "fa fa-hand-spock-o btn-space Hidden"
        }

      return (
        <div className={divclassName}>
          <span className={spanclassName} aria-hidden="true"> </span>
          {this.props.error ? this.props.error.message : ""}
        </div>
      );

      }
    else {
      return (
          <div></div>
      );
    }
  }

  render() {
    this.clearMessages.bind(this);
    return (
      <div>
      {this.renderBar()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {error: state.error };
}


export default connect(mapStateToProps, {clearMessage})(MessageBar);
