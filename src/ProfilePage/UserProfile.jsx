import React, { Component } from 'react';
import firebase from 'firebase';



export default class ProfilePage extends Component {


  render () {

    var user = firebase.auth().currentUser;
    var name = '';
    var photoUrl = '';
    var description = '';

    if (user){
      name = user.displayName;
      photoUrl = user.photoURL;
      description = user.description;
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
                <h5 className = 'flow-text left-align'>
                  {description}
                </h5>
              </h1>
            </div>
            <div className = 'col s3 center-align'>
              <img src = {photoUrl} className = 'circle responsive-img' alt=""/>
              <h4 className="center-align">{name}</h4>
            </div>
          </div>

        </div>
      </div>
    );
  }
};
