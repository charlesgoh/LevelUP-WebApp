import React, { Component } from 'react';
import Category from './Category';
import ProfileBar from './ProfileBar';
import Authen from '../Authen.jsx';
import SortFilter from './SortFilter';
import firebase from 'firebase';

export default class CategoryPage extends Component {
  render() {
    return (
      <div>
        <header>

        </header>
          {firebase.auth().currentUser ? <ProfileBar /> : ''}
          <Category />
          <SortFilter />
      </div>
    );
  }
};
