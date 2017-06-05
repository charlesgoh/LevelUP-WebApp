import React, {Component} from 'react';

export default class NavBar extends Component {

  onLogin() {
    this.props.onLogin();
  }

  onLogout() {
    this.props.onLogout();
  }

  render() {
    let authButton;
    if (this.props.idToken) {
      authButton = (
        <a onClick={this.onLogout.bind(this)} className="waves-effect waves-light btn">
          <i className="material-icons left">perm_identity</i>LOG OUT</a>
      )
    } else {
      authButton = (
        <a onClick={this.onLogin.bind(this)} className="waves-effect waves-light btn">
          <i className="material-icons left">perm_identity</i>LOG IN</a>
      )
    }

    return (
      <nav>
        <div className="nav-wrapper red darken-4">
          <a href="#" className="brand-logo center">LevelUP</a>
          <a href="#" data-activates="mobile-demo" className="button-collapse">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            <li>
              {authButton}
            </li>
          </ul>
          <ul className="side-nav" id="mobile-demo">
            <li>
              {authButton}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
};
