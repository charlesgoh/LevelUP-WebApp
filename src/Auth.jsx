// src/Auth/Auth.js
import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'charlesgoh.auth0.com',
    clientID: '6H3dOxMf1KkYNUZ30dE7FCyBiSm_GXbe',
    redirectUri: 'http://localhost:3000',
    audience: 'https://charlesgoh.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login() {
    this.auth0.authorize();
  }
}
