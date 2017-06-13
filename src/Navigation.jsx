import React, {Component} from 'react';
import Authen from './Authen';
import firebase from 'firebase';
import Router from './Router';

import * as FirebaseService from './FirebaseService';

export default class Navigation extends Component {

  logoutUser(event) {
    console.log("Logging Out Now...");
    FirebaseService.firebaseAuth.signOut();
  }

  googleSignIn() {
    console.log("Attempting to log in using Google");

    var provider = new firebase.auth.GoogleAuthProvider();
    var promise = FirebaseService.firebaseAuth.signInWithPopup(provider);

    // Handle Successful Login
    promise.then(result => {
      console.log("Google Login Successful!");
      var user = result.user;
      console.log(result);
      FirebaseService.firebaseDB.ref('users/' + user.uid).set({
        email: user.email,
        name: user.displayName
      });
    });

    // Handle Exceptions and Errors
    promise.catch(error => {
      var msg = error.message;
      console.log(msg);
    });
  }

  facebookSignIn() {
    console.log("Attempting to log in using Facebook");

    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope("public_profile");
    provider.addScope("email");
    provider.addScope("user_about_me");
    var promise = FirebaseService.firebaseAuth.signInWithRedirect(provider);

    //Handle Successful Login
    promise.then(result => {
      console.log("Facebook Login Successful!")
      console.log(result);
    });

    // Handle Exceptions and Errors
    promise.catch(error => {
      var msg = error.message;
      console.log(msg);
    });
  }

  constructor(props) {
    super(props);

    this.state = {
      uid: null,
      err: ""
    };

    this.logoutUser = this.logoutUser.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
    this.facebookSignIn = this.facebookSignIn.bind(this);
  }

  componentDidMount() {
    FirebaseService.firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        window.localStorage.setItem(FirebaseService.storageKey, user.uid);
        this.setState({uid: user.uid});
      } else {
        window.localStorage.removeItem(FirebaseService.storageKey);
        this.setState({uid: null});
      }
    });
  }

  render() {
    let masterAuthButton;

    if (!this.state.uid) {
      console.log("Rendering Sign In Button");
      masterAuthButton = (
        <a className="waves-effect waves-light btn" href="#modal1">
          <i className="material-icons left">perm_identity</i>SIGN IN
        </a>
      );
    } else {
      console.log("Rendering Sign Out Button");
      masterAuthButton = (
        <a onClick={this.logoutUser} className="waves-effect waves-light btn">
          <i className="material-icons left">exit_to_app</i>SIGN OUT
        </a>
      );
    }

    return (
      <nav>

        {/* This is the login modal */}
        <div id="modal1" className="modal">
          <div className="center modal-content red darken-4">
            <h1>LevelUP</h1>
          </div>
          <div>
            <div className="center">
              <h2>{this.state.error}</h2>
              <button onClick={this.googleSignIn}
                id="google"
                className="waves-effect waves-light btn-large red">
                <i className="fa fa-google left"></i>
                Sign In With Google
                {/* <img
                  width="32"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                  className="left">
                </img> */}
              </button>
              <br/>
              <button onClick={this.facebookSignIn} className="waves-effect waves-light btn-large blue">
                <i className="fa fa-facebook left"></i>
                Sign In With Facebook
              </button>
              <br/>
              <button className="waves-effect waves-light btn-large black">
                <i className="fa fa-github left"></i>
                Sign In With Github
              </button>
            </div>
            <br/>
          </div>
        </div>

        <div className="nav-wrapper red darken-4">
          <a href="#" className="brand-logo center">LevelUP</a>
          <a href="#" data-activates="slide-out" className="button-collapse">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            <li>
              {masterAuthButton}
            </li>
          </ul>
          <ul className="side-nav fixed" id="slide-out">
            <li>
              {masterAuthButton}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
};
