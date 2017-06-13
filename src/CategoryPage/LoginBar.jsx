import React, { Component }from 'react';

export default class LoginBar extends Component {
  render() {
    return (
      <div className = 'container z-depth-1'>
        <div className = 'card-panel center-align'>
          <a href = '#'>
            <img src = "./images/FacebokLogin.png" className = 'responsive-img' />
          </a>
        </div>
      </div>
    );
  }
};
