import React, {Component} from 'react';

export default class SideNav extends Component {
  render() {
    return (
      <ul id="slide-out" className="side-nav fixed">
        <li>
          <a href="#!">First Sidebar Link</a>
        </li>
        <li>
          <a href="#!">Second Sidebar Link</a>
        </li>
      </ul>
    );
  }
};
