import React, { Component } from 'react';
import ProfileBar from './ProfileBar';
import SortFilter from './SortFilter';
import firebase from 'firebase';

export default class CategoryPage extends Component {
  render() {
    return (
      <div>
        {firebase.auth().currentUser ? <ProfileBar /> : ''}
        <SortFilter />
      </div>
    );
  }
};
