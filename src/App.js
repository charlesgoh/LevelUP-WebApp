import React, {Component} from 'react';
import NavBar from './NavBar';
import Homepage from './Homepage/Homepage';
import firebase from 'firebase';

// Initialize Firebase
 var config = {
   apiKey: "AIzaSyCNY41AjwQcTN2bRSc76jd9biY67j5HKEo",
   authDomain: "levelup-30839.firebaseapp.com",
   databaseURL: "https://levelup-30839.firebaseio.com",
   projectId: "levelup-30839",
   storageBucket: "levelup-30839.appspot.com",
   messagingSenderId: "109258915713"
 };
 firebase.initializeApp(config);

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
