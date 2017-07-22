import React, { Component }from 'react';
import { CardPanel } from 'react-materialize';

export default class Category extends Component {
  render() {
    return (
      <CardPanel className='z-depth-1'>

        <p className = 'grey-text text-darken-2 center-align'>
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
      </CardPanel>
    );
  }
};
