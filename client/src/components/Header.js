import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { toggle: false };
    this.turnToggle = this.turnToggle.bind(this);
  }

  turnToggle() {
    if (!this.state.toggle) this.setState({ toggle: true });
    else this.setState({ toggle: false });
  }

  renderContent() {
    switch (this.props.authorizedUser) {
      case null:
        return;
      case false:
        return (
          <ul className="navbar-nav ml-auto" style={{ listStyle: 'none' }}>
            <li className="nav-item">
              <a
                className="nav-link"
                style={{ color: 'white' }}
                data-toggle="tooltip"
                title="Log In"
                data-placement="auto"
                href="/login"
              >
                Login
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link"
                style={{ color: 'white' }}
                data-toggle="tooltip"
                title="Create Account"
                data-placement="auto"
                href="/createaccount"
              >
                Sign Up
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link"
                style={{ color: 'white' }}
                href="https://github.com/ezetreezy"
                data-toggle="tooltip"
                title="Source/Github"
                data-placement="auto"
              >
                Source
              </a>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                style={{ color: 'white' }}
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Boots
              </a>
              <div
                className="dropdown-menu dropdown-menu-right"
                style={{ backgroundColor: '#2C2E30' }}
              >
                <a className="dropdown-item" href="/boots/Nike">
                  Nike
                </a>
                <a className="dropdown-item" href="/boots/Adidas">
                  Adidas
                </a>
                <a className="dropdown-item" href="/boots/Puma">
                  PUMA
                </a>
                <a className="dropdown-item" href="/boots/UnderArmour">
                  Under Armour
                </a>
                <a className="dropdown-item" href="/boots/NewBalance">
                  New Balance
                </a>
                <a className="dropdown-item" href="/boots/Hummel">
                  Hummel
                </a>
                <a className="dropdown-item" href="/boots/Mizuno">
                  Mizuno
                </a>
                <a className="dropdown-item" href="/boots/Umbro">
                  Umbro
                </a>
              </div>
            </li>
          </ul>
        );

      default:
        return (
          <ul className="navbar-nav ml-auto" style={{ listStyle: 'none' }}>
            <li className="nav-item">
              <a
                className="nav-link"
                style={{ color: 'white' }}
                data-toggle="tooltip"
                title="Log Out"
                data-placement="auto"
                href="/api/logout"
              >
                Logout
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link"
                style={{ color: 'white' }}
                data-toggle="tooltip"
                title="Profile"
                data-placement="auto"
                href="/dashboard"
              >
                Dashboard
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link"
                style={{ color: 'white' }}
                href="https://github.com/ezetreezy/bootReview"
                data-toggle="tooltip"
                title="Source/Github"
                data-placement="auto"
              >
                Source
              </a>
            </li>

            {!this.props.authorizedUser.enabled ? (
              <li className="nav-item">
                <Payments />
              </li>
            ) : (
              <li />
            )}

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                style={{ color: 'white' }}
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Boots
              </a>
              <div
                className="dropdown-menu dropdown-menu-right"
                style={{ backgroundColor: '#2C2E30' }}
              >
                <a className="dropdown-item" href="/boots/Nike">
                  Nike
                </a>
                <a className="dropdown-item" href="/boots/Adidas">
                  Adidas
                </a>
                <a className="dropdown-item" href="/boots/Puma">
                  PUMA
                </a>
                <a className="dropdown-item" href="/boots/UnderArmour">
                  Under Armour
                </a>
                <a className="dropdown-item" href="/boots/NewBalance">
                  New Balance
                </a>
                <a className="dropdown-item" href="/boots/Hummel">
                  Hummel
                </a>
                <a className="dropdown-item" href="/boots/Mizuno">
                  Mizuno
                </a>
                <a className="dropdown-item" href="/boots/Umbro">
                  Umbro
                </a>
              </div>
            </li>
          </ul>
        );
    }
  }

  render() {
    return (
      <nav
        className="navbar navbar-toggleable-md navbar-expand-md robot"
        style={{ backgroundColor: '#2C2E30' }}
      >
        <Link className="navbar-brand robot" style={{ color: '#8A2BE2' }} to={'/'}>
          <img
            src={require('../Assets/mintLogo.svg')}
            width="32.5"
            height="32.5"
            className="d-inline-block align-top"
            alt=""
          />
          mintcushions
        </Link>

        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          style={{ backgroundColor: '#8A2BE2' }}
          data-toggle="collapse"
          data-target=".navHeaderCollapse"
          aria-expanded="false"
          aria-controls="navHeaderCollapse"
          aria-label="Toggle navigation"
        >
          <span
            className={this.state.toggle ? 'fa fa-bars fa-rotate-90' : 'fa fa-bars'}
            onClick={() => this.turnToggle()}
            style={{ color: 'white' }}
          />
        </button>

        <div className="collapse navbar-collapse navHeaderCollapse">
          {this.renderContent()}
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { authorizedUser: state.authorizedUser };
}

export default connect(mapStateToProps)(Header);
