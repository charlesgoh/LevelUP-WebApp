import React, { Component } from 'react';

export default class ListingInstance extends Component {
  render() {
    return (
      <div className = "card-panel z-depth-1">
        <div className = "container">
          <div className = 'row'>
            <div className = 'col s9'>
              <h3 className = 'flow-text left-align'>
                {this.props.description}
              </h3>
            </div>
            <div className = 'col s3 center-align'>
              <a class="waves-effect waves-light btn">View Profile</a>

              <img src = {this.props.photoURL} className = 'circle responsive-img' alt=""/>
              <h4 className="center-align">{this.props.name}</h4>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
