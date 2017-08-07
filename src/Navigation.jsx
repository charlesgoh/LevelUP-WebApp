import React, {Component} from 'react';
import firebase from 'firebase';
import CategoryPage from './CategoryPage/CategoryPage.jsx';
import * as FirebaseService from './FirebaseService';
import { Redirect, Link } from 'react-router-dom';
// import { Modal, Button, CardPanel, Icon, SideNav, SideNavItem, Navbar, NavItem } from 'react-materialize';

export default class Navigation extends Component {

  logoutUser(event) {
    FirebaseService.firebaseAuth.signOut();
  }

  googleSignIn() {

    var provider = new firebase.auth.GoogleAuthProvider();
    var promise = FirebaseService.firebaseAuth.signInWithPopup(provider);

    // Handle Successful Login
    promise.then(result => {
      var user = result.user;

      FirebaseService.firebaseDB.ref('users/' + user.uid).update({
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL
      });

      var userRef = FirebaseService.firebaseDB.ref('/users');
      userRef.once('value', snapshot => {
        var data = snapshot.val();
        if (!data[user.uid]["initialized"]){
          FirebaseService.firebaseDB.ref('users/' + user.uid).update({
            initialized: true
          });
          this.setState({newUser: true});
        }
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
    var promise = FirebaseService.firebaseAuth.signInWithRedirect(provider);

    //Handle Successful Login
    promise.then(result => {
      console.log("Facebook Login Successful!");
      var user = result.user;
      // Set Firebase DB variables for user
      FirebaseService.firebaseDB.ref('users/' + user.id).update({
        email: user.email,
        name: user.name,
        photoURL: user.picture
      });
      console.log("Facebook user saved into databse");
    });

    promise.catch(function(error) {
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
      err: "",
      newUser: false
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
  /*
    if (this.state.newUser){
      return (
        <Redirect to={"/welcome"} />
      )
    }*/

    var logIn = (
      <a className="waves-effect waves-light btn" href="#modal1">
        <i className="material-icons left">perm_identity</i>SIGN IN
      </a>
    );
    var logOut = (
      <a onClick={this.logoutUser} className="waves-effect waves-light btn">
        <i className="material-icons left">exit_to_app</i>SIGN OUT
      </a>
    );

    /*return (
      <Navbar className="red darken-4 center" brand='LevelUP'>
        <NavItem>
          <SideNav
            trigger={
              <Button className='button-collapse'>
                <Icon center>menu</Icon>
              </Button>
            }
            options={{ closeOnClick: true }}
            >
            {this.state.uid ? <SideNavItem className='center-align'>
              {masterAuthButton}
            </SideNavItem> : ""}
            {!this.state.uid ? <SideNavItem  onClick={this.googleSignIn} className="red">
              Sign In With Google
            </SideNavItem> : ""}
            {!this.state.uid ? <SideNavItem  onClick={this.FacebookSignIn} className="blue">
              Sign In With Facebook
            </SideNavItem> : ""}
            <CategoryPage />
          </SideNav>
        </NavItem>
      </Navbar>
    );*/

    return (
      <nav>
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
            <span className="brand-logo center">LevelUP</span>
          </Link>
          <a data-activates="slide-out" className="button-collapse">
            <i className="material-icons">menu</i>
          </a>
          <ul className="side-nav fixed" id="slide-out">
            <li>
              {this.state.uid ? logOut : ""}
            </li>
            <li>
              {this.state.uid ? "" : logIn}
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
