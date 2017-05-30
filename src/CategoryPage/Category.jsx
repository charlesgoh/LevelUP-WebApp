import React, { Component }from 'react';

export default class Category extends Component {
  render() {
    return (
      <div className = 'card-panel z-depth-1'>

        <p className = 'grey-text text-lighten-1 center-align'>
          Coaches/Tutors
        </p>

        <h4 className='center-align'>
          <a href = '#' className='flow-text red-text text-darken-4'>
            Fitness / Strength
          </a>
        </h4>
        <h4 className='center-align'>
          <a href = '#' className='flow-text red-text text-darken-4'>
            Sports
          </a>
        </h4>
      </div>
    );
  }
};
