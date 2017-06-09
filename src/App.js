import React, {Component} from 'react';
import NavBar from './NavBar';
import Homepage from './Homepage/Homepage';


export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      idToken: '',
      profile: {}
    };
  }

  render() {
    return (
      <div>
        <header>
          <NavBar/>
        </header>
        <main>
          <Homepage/>
        </main>
        <footer></footer>
      </div>
    );
  }
};
