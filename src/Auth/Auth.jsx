// src/Auth/Auth.js

import history from '../history';
import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'charlesgoh.auth0.com',
    clientID: 'WbD80aO58DKAH7hpbw24C5018ZKRNl20',
    redirectUri: 'http://localhost:3000',
    audience: 'https://charlesgoh.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login() {
    this.auth0.authorize();
  }
}
