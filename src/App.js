import React, { Component }from 'react';
import NavBar from './NavBar';
import Homepage from './Homepage/Homepage';

export default class App extends Component {
  render() {
    return (
      <div>
        <header>
          <NavBar title="LevelUP"/>
        </header>
        <main>
          <Homepage />
        </main>
        <footer>

        </footer>
      </div>
    );
  }
};
