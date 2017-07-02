import React, { Component } from 'react';
import UserProfile from './UserProfile';
import Listing from './Listing';
import firebase from 'firebase';

export default class ProfilePage extends Component {
  render (){
    var user = firebase.auth().currentUser;
    var uidProp = '';
    if (user){
      uidProp = user.uid;
    } else {
      // console.log(this.props.location.state);
      uidProp = this.props.location.state.uid;
    }
    return (
      <div>
        <UserProfile uid={uidProp}/>
        <Listing uid={uidProp} />
      </div>
    );
  }
};
