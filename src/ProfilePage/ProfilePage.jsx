import React, { Component } from 'react';
import UserProfile from './UserProfile';
import Listing from './Listing';

export default class ProfilePage extends Component {
  render (){
    return (
      <div>
        <UserProfile />
        <Listing />
      </div>
    );
  }
};
