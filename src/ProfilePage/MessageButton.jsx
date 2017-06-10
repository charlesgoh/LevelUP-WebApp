import React, { Component } from 'react';
// message if !current user else messages

export default class MessageButton extends Component {
  render () {
    return (
      <div>
        <a href = '#' className = 'grey-text text-darken-1'>
          <div className = 'center-align grey ligten-1'>
            <h4>
              Message
            </h4>
          </div>
        </a>
      </div>
    );
  }
};
