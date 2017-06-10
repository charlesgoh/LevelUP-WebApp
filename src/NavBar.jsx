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
              <button className="waves-effect waves-light btn-large red">
                <i className="fa fa-google left"></i>
                Sign In With Google
                {/* <img
                  width="32"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                  className="left">
                </img> */}
              </button>
              <br/>
              <button className="waves-effect waves-light btn-large blue">
                <i className="fa fa-facebook left"></i>
                Sign In With Facebook
              </button>
              <br/>
              <button className="waves-effect waves-light btn-large black">
                <i className="fa fa-github left"></i>
                Sign In With Github
              </button>
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
