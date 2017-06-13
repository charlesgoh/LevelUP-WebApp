import React, { Component } from 'react';
import Category from './Category';
import ProfileBar from './ProfileBar';
import LoginBar from './LoginBar';
import SortFilter from './SortFilter';

export default class CategoryPage extends Component {
  render() {
    return (
      <div>
        <header>

        </header>
          <Category />
          <SortFilter />
          <ProfileBar />
          <LoginBar />
      </div>
    );
  }
};
