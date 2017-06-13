import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import firebase from 'firebase';

import * as FirebaseService from './FirebaseService';

import App from './App';
import CategoryPage from './CategoryPage/CategoryPage';
import NotFound from './NotFound';
import Navigation from './Navigation';
import ListingsPage from './ListingsPage/ListingsPage.jsx';
import ProfilePage from './ProfilePage/ProfilePage.jsx';

export default class Router extends Component {

  constructor(props) {
    super(props);

    this.state = {
      uid: null,
      err: ''
    }
  }

  componentDidMount() {
    FirebaseService.firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        window.localStorage.setItem(FirebaseService.storageKey, user.uid);
        this.setState({uid: user.uid});
      } else {
        window.localStorage.removeItem(FirebaseService.storageKey);
        this.setState({uid: null});
      }
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation/>
          <Switch>
            <Route exact path="/" component= { App }/>
            <Route path="/categories" component={ CategoryPage }/>
            <Route path="/listing" component={ ListingsPage }/>
            <Route path="/profile" component={ ProfilePage }/>
            {/* <Route path="users" component={ Users }>
              <Route path="/users/:userID" component={ Users } />
            </Route> */}
            <Route path="/*" component={ NotFound } />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}
