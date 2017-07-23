import React, {Component} from 'react';
import firebase from 'firebase';
import CategoryPage from './CategoryPage/CategoryPage.jsx';
import * as FirebaseService from './FirebaseService';
import { Link } from 'react-router-dom';
// import { Modal, Button, CardPanel, Icon } from 'react-materialize';

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
      FirebaseService.firebaseDB.ref('users/' + user.uid).update({
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL
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
    // var promise = FirebaseService.firebaseAuth.signInWithRedirect(provider);

    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // console.log(user);

      // Set Firebase DB variables for user
      FirebaseService.firebaseDB.ref('users/' + token).update({
        email: user.email,
        name: user.name,
        photoURL: user.picture
      });
      console.log("Facebook user saved into databse");

    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log(errorCode);
      console.log(errorMessage);
      console.log(email);
      console.log(credential);
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
        this.setState({
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL,
          name: user.name,
          description: user.description
        });
      } else {
        window.localStorage.removeItem(FirebaseService.storageKey);
        this.setState({
          uid: null,
          email: "",
          photoURL: '',
          name: "",
          description: ""
        });
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
              </button>
              <br/>
              <button onClick={this.facebookSignIn} className="waves-effect waves-light btn-large blue">
                <i className="fa fa-facebook left"></i>
                Sign In With Facebook
              </button>
              <br/>
            </div>
            <br/>
          </div>
        </div>

        <div className="nav-wrapper red darken-4">
          <Link to="/">
          {/* <a href="http://localhost:3000" className="brand-logo center">LevelUP</a> */}
            <span className="brand-logo center">LevelUP</span>
          </Link>
          {/* <a className="brand-logo center">LevelUP</a> */}
          <a data-activates="slide-out" className="button-collapse">
            <i className="material-icons">menu</i>
          </a>
          <ul className="side-nav fixed" id="slide-out">
            <li>
              {masterAuthButton}
            </li>
            <li>
              <CategoryPage />
            </li>
          </ul>
        </div>
      </nav>
    );
  }
};
