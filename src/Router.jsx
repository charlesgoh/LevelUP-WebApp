import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';


import App from './App';
import Homepage from './Homepage/Homepage';
import CategoryPage from './CategoryPage/CategoryPage';
import NotFound from './NotFound';

export default class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <App>
          <Route path="index" component= { Homepage }/>
          <Route path="categories" component={ CategoryPage }/>
          {/* <Route path="users" component={ Users }>
            <Route path="/users/:userID" component={ Users } />
          </Route> */}
          <Route path="*" component={ NotFound } />
        </App>
      </BrowserRouter>
    )
  }
}
