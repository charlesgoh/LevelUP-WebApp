import React, {Component} from 'react';
import Authen from './Authen';
import firebase from 'firebase';

const storageKey = 'KEY_FOR_LOCAL_STORAGE'

export default class Navigation extends Component {

  googleSignIn() {
    console.log("Attempting to log in using Google");

    var provider = new firebase.auth.GoogleAuthProvider();
    var promise = firebase.auth().signInWithRedirect(provider);

    // Handle Successful Login
    promise.then(result => {
      var user = result.user;
      console.log(result);
      firebase.database().ref('users/' + user.uid).set({
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

  // facebookSignIn() {
  //   console.log("Attempting to log in using Facebook");
  //
  //   // Sign in using redirect. Case 1: If already authenticated
  //   firebase.auth().getRedirectResult().then(result => {
  //     if (result.credential) {
  //       // This is the Google Access Token
  //       var token = result.credential.accessToken;
  //     }
  //     var user = result.user;
  //     //Sign in for unauthenticated user
  //
  //   })
  //
  //   var provider = new firebase.auth.FacebookAuthProvider();
  //   provider.addScope("public_profile");
  //   provider.addScope("email");
  //   provider.addScope("user_about_me");
  //
  //   //Handle Successful Login
  //   promise.then(result => {
  //
  //   })
  //
  //   // Handle Exceptions and Errors
  // }

  constructor(props) {
    super(props);

    this.state = {
      uid: null,
      err: ""
    };

    this.googleSignIn = this.googleSignIn.bind(this);
    //this.facebookSignIn = this.facebookSignIn.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        window.localStorage.setItem(storageKey, user.uid);
        this.setState({uid: user.uid});
      } else {
        window.localStorage.removeItem(storageKey);
        this.setState({uid: null});
      }
    });
  }

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
              <h2>{this.state.error}</h2>
              <button
                onClick={this.googleSignIn}
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
