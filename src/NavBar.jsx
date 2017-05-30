import React, {Component} from 'react';
import SideNav from './SideNav.jsx';

export default class NavBar extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper red darken-4">

          <a href="#!" className="brand-logo center">{ this.props.title }</a>

          <SideNav />
          <a href="#" data-activates="slide-out" className="button-collapse">
            <i className="material-icons">menu</i>
          </a>

        </div>
      </nav>

    );
  }
};
