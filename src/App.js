import React, { Component }from 'react';
import NavBar from './NavBar';
import Homepage from './Homepage/Homepage';
import AuthPage from './Auth/AuthPage';

export default class App extends Component {
  render() {
    return (
      <div>
        <header>
          <NavBar title="LevelUP"/>
        </header>
        <main>
          {/* <Homepage /> */}
          <AuthPage />
        </main>
        <footer>

        </footer>
      </div>
    );
  }
};
