import React, { Component } from 'react';
import UserProfile from './UserProfile';
import Listing from './Listing';

export default class ProfilePage extends Component {
  render (){
    let uidProp = this.props.location.state.uid;
    return (
      <div>
        <UserProfile uid={uidProp}/>
        <Listing uid={uidProp} />
      </div>
    );
  }
};
