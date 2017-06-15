import React, { Component } from 'react';
import LogoutButton from './LogoutButton';
import UserProfile from './UserProfile';
import MessageButton from './MessageButton';
import Listing from './Listing';

export default class ProfilePage extends Component {
  render (){
    return (
      <div>
        <UserProfile />
        <MessageButton />
        <Listing />
      </div>
    );
  }
};
