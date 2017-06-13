import React, { Component }from 'react';
import firebase from 'firebase';

export default class ProfileBar extends Component {
  render() {
    return (
      <div className = 'card-panel z-depth-1'>
        <div className = 'container center-align grey lighten-2'>
          <div className = 'row valign-wrapper'>
            <div className = 'col s2'>
              <i className = 'small material-icons'>
                info_outline
              </i>
            </div>

            <div className = 'col s7 left-align'>
              <p className = 'flow-text grey-text'>
                {firebase.auth().currentUser.displayName}
              </p>

              <p className = 'flow-text'>
                <a href = '#' className = 'red-text text-darken-4'>
                  Profile
                </a>
              </p>
            </div>

            <div className = 'col s3 grey-text center-align'>
              <img src = "./images/Logout.png" className = 'responsive-image' />
              <p>
                <a href ='#' className = 'flow-text grey-text'>
                  LOG OUT
                </a>
              </p>
            </div>

          </div>
        </div>
      </div>
    );
  }
};
