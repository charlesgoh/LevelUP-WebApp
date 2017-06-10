import React, { Component } from 'react';


import App from './App';
import Homepage from './Homepage/Homepage';
import CategoryPage from './CategoryPage/CategoryPage';
import NotFound from './NotFound';

export default class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <App>
          <Route exact path="/" component= { Homepage }/>
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
