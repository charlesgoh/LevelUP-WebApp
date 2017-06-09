import React, {Component} from 'react';
import NavBar from './NavBar';
import Homepage from './Homepage/Homepage';
import firebase from 'firebase';
import firebaseui from 'firebaseui';

var config = {
  apiKey: "AIzaSyCNY41AjwQcTN2bRSc76jd9biY67j5HKEo",
  authDomain: "levelup-30839.firebaseapp.com",
  databaseURL: "https://levelup-30839.firebaseio.com",
  projectId: "levelup-30839",
  storageBucket: "levelup-30839.appspot.com",
  messagingSenderId: "109258915713"
};
firebase.initializeApp(config);

// FirebaseUI config.
var uiConfig = {
  signInSuccessUrl: '<url-to-redirect-to-on-success>',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    // firebase.auth.EmailAuthProvider.PROVIDER_ID,
    // firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>'
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      idToken: '',
      profile: {}
    };
  }

  render() {
    return (
      <div>
        <header>
          <NavBar/>
        </header>
        <main>
          <Homepage/>
        </main>
        <footer></footer>
      </div>
    );
  }
};
