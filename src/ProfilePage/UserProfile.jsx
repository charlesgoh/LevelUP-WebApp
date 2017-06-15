import React, { Component } from 'react';
import firebase from 'firebase';



export default class ProfilePage extends Component {


  render () {

    var user = firebase.auth().currentUser;
    var name = '';
    var photoUrl = '';

    if (user){
      name = user.displayName;
      photoUrl = user.photoURL;
    }

    return (
      <div className = "card-panel z-depth-1">

        {user ? <h6 className = 'right-align flow-text'>
          <a href ='#'>
            Edit
          </a>
        </h6> : ''}

        <div className = "container">
          <div className = 'row'>
            <div className = 'col s9'>
              <h1 className =  'left-align'>
                {name}
              </h1>
            </div>
            <div className = 'col s3 center-align'>
              <img src = {photoUrl} className = 'circle responsive-img' alt=""/>
            </div>
          </div>

          <h5 className = 'flow-text left-align'>
            About Me
          </h5>

          <h5 className = 'flow-text left-align'>
            A 3rd-year student at S High School. I can teach you how to swim.
          </h5>
        </div>
      </div>
    );
  }
};
