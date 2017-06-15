import React, { Component }from 'react';
import firebase from 'firebase';

export default class ProfileBar extends Component {
  render() {
    return (
      <div class="col s12 m8 offset-m2 l6 offset-l3">
        <div className = 'card-panel z-depth-1'>
          <div className = 'center-align'>
            <div className = 'row valign-wrapper'>
              <div className = 'col s4'>
                <img className = "circle responsive-img" src={firebase.auth().currentUser.photoURL} />
              </div>

              <div className = 'col s8 left-align'>
                <a href="#" className = 'flow-text grey-text text-darken-2'>
                    {firebase.auth().currentUser.displayName}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
