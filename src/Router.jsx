import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import * as FirebaseService from './FirebaseService';

import App from './App';
import NotFound from './NotFound';
import Navigation from './Navigation';
import ProfilePage from './ProfilePage/ProfilePage.jsx';
import MessagePage from './MessagePage/MessagePage.jsx';
import Inbox from './MessagePage/Inbox.jsx';

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
            <Route path="/profile/:value" component= { ProfilePage }/>
            <Route path="/inbox" component= { Inbox } />
            <Route path="/message/:value" component= { MessagePage } />
            <Route path="/*" component={ NotFound } />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}
