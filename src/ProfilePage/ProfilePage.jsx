import React, { Component } from 'react';
import UserProfile from './UserProfile';
import Listing from './Listing';

export default class ProfilePage extends Component {
  render (){
    let uidProp = window.location.search.slice(2);
    return (
      <div>
        <UserProfile uid={uidProp}/>
        <Listing uid={uidProp} />
      </div>
    );
  }
};
