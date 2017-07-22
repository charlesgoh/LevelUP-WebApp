import React, { Component } from 'react';
import { Icon } from 'react-materialize';

export default class Authen extends Component {

  render() {
    return (
      <a className="waves-effect waves-light btn" href="#modal1">
        <Icon>perm_identity</Icon>SIGN IN
      </a>
    );
  }
}
