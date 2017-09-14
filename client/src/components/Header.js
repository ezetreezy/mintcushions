import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {

  renderContent(){
      switch(this.props.authorizedUser)
      {
        case null:
        return;
        case false:
        return (
          <div>
              <a className="btn btn-secondary btn-space" style={{backgroundColor: '#8A2BE2'}}
              data-toggle="tooltip"
              title="Log In"
              data-placement="auto"
              href="/login"><span className="fa fa-sign-in" aria-hidden="true"></span></a>

             <a className="btn btn-secondary btn-space" style={{backgroundColor: '#8A2BE2'}}
             data-toggle="tooltip"
             title="Create Account"
             data-placement="auto"
             href="/createaccount"><span className="fa fa-cog" aria-hidden="true"></span></a>

             <a className="btn btn-secondary btn-space" style={{backgroundColor: '#8A2BE2'}}
             href="https://github.com/ezetreezy/bootReview"
             data-toggle="tooltip"
             title="Source/Github"
             data-placement="auto">
             <span className="fa fa-git" aria-hidden="true"></span></a>
          </div>
        );

        default:
          return (
            <div>
                  <a className="btn btn-secondary btn-space" style={{backgroundColor: '#8A2BE2'}}
                  data-toggle="tooltip"
                  title="Log Out"
                  data-placement="auto"
                  href="/api/logout"><span className="fa fa-outdent" aria-hidden="true"></span></a>

                 <a className="btn btn-secondary btn-space" style={{backgroundColor: '#8A2BE2'}}
                 data-toggle="tooltip"
                 title="Profile"
                 data-placement="auto"
                 href="/dashboard"><span className="fa fa-user" aria-hidden="true"></span></a>

                 <a className="btn btn-secondary btn-space" style={{backgroundColor: '#8A2BE2'}}
                 href="https://github.com/ezetreezy/bootReview"
                 data-toggle="tooltip"
                 title="Source/Github"
                 data-placement="auto">
                 <span className="fa fa-git" aria-hidden="true"></span></a>

                {!this.props.authorizedUser.enabled ? <Payments/> : <a className="btn btn-secondary"
                data-toggle="tooltip"
                title="Full Features Enabled"
                data-placement="auto"
                style={{backgroundColor: '#8A2BE2'}}
                href="">
                <span className="fa fa-plus-circle" aria-hidden="true"></span>
                </a>}
            </div>
          );
      }
  }

  render() {
    return (
     <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse" style={{backgroundColor: '#2C2E30'}}>
      <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
        <Link className="navbar-brand"
              style={{color: 'white'}}
              to={this.props.authorizedUser ? '/reviews' : '/'}>
              bootlocker
        </Link>
        <div className="mr-auto">
            {/*}<a href="https://github.com/ezetreezy/bootReview" className="navbar-link btn btn-space" style={{backgroundColor: '#FF8C00'}}>
            <span className="fa fa-github" aria-hidden="true"></span></a>*/}
        </div>
        <div className="navbar-nav">
              {this.renderContent()}
        </div>
      </nav>

    );
  }
}


function mapStateToProps(state) {
  return {authorizedUser: state.authorizedUser};
}


export default connect(mapStateToProps)(Header);
