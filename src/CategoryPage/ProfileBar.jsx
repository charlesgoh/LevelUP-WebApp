import React, { Component }from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

export default class ProfileBar extends Component {

  render() {
    var user = firebase.auth().currentUser;
    return (
      <div className="col s12 m8 offset-m2 l6 offset-l3">
        <div className = 'card-panel z-depth-1'>
          <div className = 'center-align'>
            <div className = 'row valign-wrapper'>
              <div className = 'col s4'>
                <img alt="" className="circle responsive-img" src={user.photoURL} />
              </div>

              <div className = 'col s8 left-align'>
                <Link to={{
                  pathname: "/profile/id?=" + user.uid,
                  state: {
                    uid: user.uid
                  }}
                }>
                  <strong className="flow-text black-text">{user.displayName}</strong>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
