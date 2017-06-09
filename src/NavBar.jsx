import React, {Component} from 'react';

export default class NavBar extends Component {

  render() {
    let authButton;
    authButton = (
      <div>
          <a className="waves-effect waves-light btn" href="#modal1">
            <i className="material-icons left">perm_identity</i>LOGIN
          </a>
      </div>
    );

    return (
      <nav>
        {/* This is the login Modal */}
        <div id="modal1" className="modal">
          <div className="center modal-content red darken-4">
            <h1>LevelUP</h1>
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
          </div>
        </div>

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
