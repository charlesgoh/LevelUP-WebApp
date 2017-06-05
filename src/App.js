import React, { Component }from 'react';
import NavBar from './NavBar';
import Homepage from './Homepage/Homepage';
import Auth0Lock from 'auth0-lock';

export default class App extends Component {

  static defaultProps = {
    clientID: "6H3dOxMf1KkYNUZ30dE7FCyBiSm_GXbe",
    domain: "charlesgoh.auth0.com/"
  }

  constructor(props) {
    super(props);

    this.state = {
      idToken: '',
      profile: {}
    };

    this.login = this.login.bind(this);
    // this.logout = this.logout.bind(this);
    // this.handleAuthentication = this.handleAuthentication.bind(this);
    // this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  componentWillMount() {
    this.lock = new Auth0Lock(this.props.clientID, this.props.domain);

    this.lock.on('authenticated', (authResult) => {
      console.log(authResult);
    });
  }

  showLock() {
    this.lock.show();
  }

  login() {
    this.auth0.authorize();
  }

  render() {
    return (
      <div>
        <header>
          <NavBar title="LevelUP" onLogin={this.showLock.bind(this)}/>
        </header>
        <main>
          <Homepage />
        </main>
        <footer>

        </footer>
      </div>
    );
  }
};
