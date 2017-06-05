import React, { Component }from 'react';
import NavBar from './NavBar';
import Homepage from './Homepage/Homepage';
import Auth0Lock from 'auth0-lock';

export default class App extends Component {

  static defaultProps = {
    domain: 'charlesgoh.auth0.com',
    clientID: '6H3dOxMf1KkYNUZ30dE7FCyBiSm_GXbe',
    redirectUri: 'http://localhost:3000',
    audience: 'https://charlesgoh.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
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
      // console.log(authResult);

      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          console.log(error);
          return;
        }

        // console.log(profile);
        this.setProfile(authResult.idToken, profile);
      });
    });

    this.getProfile();

  }

  getProfile() {
    if(localStorage.getItem('idToken') != null) {
      this.setState({
        idToken: localStorage.getItem('idToken'),
        profile: JSON.parse(localStorage.getItem('profile'))
      }, () => {
        console.log(this.state);
      });
    }
  }

  setProfile(idToken, profile) {
    localStorage.setItem('idToken', idToken);
    localStorage.setItem('profile', JSON.stringify(profile));

    this.setState({
      idToken: localStorage.getItem('idToken'),
      profile: JSON.parse(localStorage.getItem('profile'))
    });
  }

  showLock() {
    this.lock.show();
  }

  login() {
    this.auth0.authorize();
  }

  render() {
    //Quick Check of Login Statement using Authentication Button
    let authButtonAction;

    if (this.state.idToken) {
      authButtonAction = "LOG OUT";
    } else {
      authButtonAction = "LOG IN";
    }

    return (
      <div>
        <header>
          <NavBar title="LevelUP" onLogin={this.showLock.bind(this)} authButton={authButtonAction}/>
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
