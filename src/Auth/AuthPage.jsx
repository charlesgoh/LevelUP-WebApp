import React, {Component} from 'react';

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

  }

  render() {
    return (
      // Email Address
      <div className="container center">
        <div className="row">
          <div className="input-field col s12">
            <input type="email" ref="email" className="validate"></input>
            <label for="email">Email</label>
          </div>
        </div>

        {/* Password */}
        <div className="row">
          <div className="input-field col s12">
            <input type="password" ref="pass" className="validate"></input>
            <label for="password">Password</label>
          </div>
        </div>

        <h2> {this.state.err} </h2>

        {/* Create New Account */}
        <button onClick={this.signup} className="orange darken-4 waves-effect waves-light btn-large" onClick={this.login}>Log In</button>
      </div>
    )
  }
};
