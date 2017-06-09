import React, {Component} from 'react';
import Authen from './Authen';

export default class NavBar extends Component {

  render() {
    return (
      <nav>
        {/* This is the login Modal */}
        <div id="modal1" className="modal">
          <div className="center modal-content red darken-4">
            <h1>LevelUP</h1>
          </div>
          <div>
            <div className="center">
              <a className="waves-effect waves-light btn"><i className="material-icons left">cloud</i>Button</a>
            </div>
            <p></p>
          </div>
        </div>

        <div className="nav-wrapper red darken-4">
          <a href="#" className="brand-logo center">LevelUP</a>
          <a href="#" data-activates="mobile-demo" className="button-collapse">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            <li>
              <Authen />
            </li>
          </ul>
          <ul className="side-nav" id="mobile-demo">
            <li>
              <Authen />
            </li>
          </ul>
        </div>
      </nav>
    );
  }
};
