import React, {Component} from 'react';
import NavBar from './NavBar';
import Homepage from './Homepage/Homepage';
import firebase from 'firebase';

let config = {
  apiKey: "AIzaSyCNY41AjwQcTN2bRSc76jd9biY67j5HKEo",
  authDomain: "levelup-30839.firebaseapp.com",
  databaseURL: "https://levelup-30839.firebaseio.com",
  projectId: "levelup-30839",
  storageBucket: "levelup-30839.appspot.com",
  messagingSenderId: "109258915713"
}

export const firebaseApp = firebase.initializeApp(config);

export const db = firebaseApp.database();
export const auth = firebaseApp.auth();

export const storageKey = 'KEY_FOR_LOCAL_STORAGE';

export const isAuthenticated = () => {
  return !!auth.currentUser || !!localStorage.getItem(storageKey);
}

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      uid: null,
      err: ''
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
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
      <div>
        <header>
          <NavBar/>
        </header>
        {/* <main>
          <Homepage/>
        </main> */}
        <footer></footer>
      </div>
    );
  }
};
