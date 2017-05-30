import React, { Component }from 'react';
import './CategoryPage.css';

export default class Category extends Component {
  render() {
    return (
      <div className = 'boxed'>

        <p className = 'title center'>
          Coaches/Tutors
        </p>

        <p className='page-hyperlink center'>
          <a href = '#'>
            Fitness / Strength
          </a>
        </p>
        <p className='page-hyperlink center'>
          <a href = '#'>
            Sports
          </a>
        </p>
      </div>
    );
  }
};
