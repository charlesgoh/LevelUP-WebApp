import React, { Component } from 'react';
// edit is not visible if !current user
export default class ProfilePage extends Component {
  render () {
    return (
      <div className = "card-panel z-depth-1">
        <h6 className = 'right-align flow-text'>
          <a href ='#'>
            Edit
          </a>
        </h6>
        <div className = "container">
          <div className = 'row'>
            <div className = 'col s8'>
              <h3 className = 'flow-text left-align'>
                Amatsu Yukikaze
              </h3>
            </div>
            <div className = 'col s4 center-align'>
              <img src = "https://i.imgur.com/2HxCx9i.png" className = 'circle responsive-img' alt=""/>
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
