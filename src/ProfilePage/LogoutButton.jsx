import React, { Component } from 'react';

export default class LogoutButton extends Component {
  render () {
    return (
      <div>
        <a href = '#' className = 'grey-text text-darken-2'>
          <div className = 'center-align grey row'>
            <div className = 'col s6 right-align'>
              <img src = "./images/Logout.png" />
            </div>
            <div className = 'col s6 left-align'>
              <p>
                LOG OUT
              </p>
            </div>
          </div>
        </a>
      </div>
    );
  }
};
