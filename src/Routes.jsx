import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';


import App from './App';
import Homepage from './Homepage/Homepage';
import CategoryPage from './CategoryPage/CategoryPage';

export default class Routes extends Component {
  render() {
    <BrowserRouter>
      <Route exact path="/" component={ App }>
        <Route path="home" component= { Homepage }/>
        <Route path="/categories" component={ CategoryPage }/>
        {/* <Route path="users" component={ Users }>
          <Route path="/users/:userID" component={ Users } />
        </Route> */}
        <Route path="*" component={ Null } />
      </Route>
    </BrowserRouter>
  }
}
