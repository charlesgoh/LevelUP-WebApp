import React, {Component} from 'react';
var firebase = require('firebase');

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

export default class AuthPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      err: ""
    };

    this.signup = this.signup.bind(this);
  }

  signup(event) {
    console.log("User attempting to sign in");
    const email = this.refs.email.value;
    const password = this.refs.pass.value;
    console.log(email, password);

    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email, password);

    promise.then(user => {
      var err = "Welcome " + user.email;
      firebase.database().ref('users/' + user.uid).set({ email: user.email });
      console.log(user);
      this.setState({err: err});
    });

    promise.catch(e => {
      var err = e.message;
      console.log(err);
      this.setState(({ err: err }));
    });
  }

  render() {
    return (
      // Email Address
      <div className="container center padding-top: 50px">
        <div className="row">
          <div className="input-field col s12">
            <input type="email" ref="email" className="validate"></input>
            <label htmlFor="email">Email</label>
          </div>
        </div>

        {/* Password */}
        <div className="row">
          <div className="input-field col s12">
            <input type="password" ref="pass" className="validate"></input>
            <label htmlFor="password">Password</label>
          </div>
        </div>

        <h2> {this.state.err} </h2>

        <div className="row">
          {/* Create New Account */}
          <div className="col s4">
            <button onClick={this.signup} className="red darken-4 waves-effect waves-light btn-large s4" onClick={this.login}>SIGN UP</button>
          </div>
          <div className="col s4">
            <button onClick={this.signup} className="red darken-4 waves-effect waves-light btn-large s4" onClick={this.login}>LOG IN</button>
          </div>
          <div className="col s4">
            <button onClick={this.signup} className="red darken-4 waves-effect waves-light btn-large s4 disabled" onClick={this.login}>LOG OUT</button>
          </div>
        </div>
      </div>
    )
  }
};
