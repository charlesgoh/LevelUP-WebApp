import React, { Component }from 'react';
import NavBar from './NavBar';
import Homepage from './Homepage/Homepage';
import CategoryPage from './CategoryPage/CategoryPage';
import ProfilePage from './ProfilePage/ProfilePage';

export default class App extends Component {
  render() {
    return (
      <div>
        <header>
          <NavBar title="LevelUP"/>
        </header>
        <main>
          <ProfilePage />
        </main>
        <footer>

        </footer>
      </div>
    );
  }
};
