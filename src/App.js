import React, { Component }from 'react';
import NavBar from './NavBar';
import Homepage from './Homepage/Homepage';
import CategoryPage from './CategoryPage/CategoryPage';

export default class App extends Component {
  render() {
    return (
      <div>
        <header>
          <NavBar title="LevelUP"/>
        </header>
        <main>
          <CategoryPage />
        </main>
        <footer>

        </footer>
      </div>
    );
  }
};
