import React, {Component} from 'react';
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
  }

  componentWillMount() {
    var options = {
      theme: {
        primaryColor: '#b71c1c'
      }
    };

    this.lock = new Auth0Lock(this.props.clientID, this.props.domain, options);

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
    if (localStorage.getItem('idToken') != null) {
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

  logout() {
    this.setState({
      idToken: '',
      profile: ''
    }, () => {
      localStorage.removeItem('idToken');
      localStorage.removeItem('profile');
    });
  }

  render() {
    return (
      <div>
        <header>
          <NavBar
            title="LevelUP"
            lock={this.lock}
            idToken={this.state.idToken}
            onLogin={this.showLock.bind(this)}
            onLogout={this.logout.bind(this)}/>
        </header>
        <main>
          <Homepage/>
        </main>
        <footer></footer>
      </div>
    );
  }
};
