import React, {Component} from 'react';

export default class NavBar extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper red darken-4">
          <a href="#!" className="brand-logo center">LevelUP</a>
          <a href="#" data-activates="mobile-demo" className="button-collapse">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            <li>
              <a className="waves-effect waves-light btn-large"><i className="large material-icons left">perm_identity</i>LOG IN</a>
            </li>
          </ul>
          <ul className="side-nav" id="mobile-demo">
            <li>
              <a className="waves-effect waves-light btn-large"><i className="large material-icons left">perm_identity</i>LOG IN</a>
            </li>
          </ul>
        </div>
      </nav>

    );
  }
};
