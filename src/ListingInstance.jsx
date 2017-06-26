import React, { Component } from 'react';

export default class ListingInstance extends Component {
  render() {
    return (
      <div className = "card-panel z-depth-1">
        <div className = "container">
          {/* BUTTON GOES HERE */}
          <div className = 'row'>
            <div className = 'col s4 left-align'>
              <br />
              <h6 className = 'flow-text grey-text text-lighten'>
                PRICE
              </h6>

              <h5 className = 'flow-text yellow-text text-darken-4'>
                SG${this.props.price}
              </h5>

              <h6 className = 'flow-text grey-text text-lighten'>
                PER HOUR
              </h6>
            </div>

            <div className = 'col s8'>
              <h2 className = 'flow-text red-text text-darken-4'>
                {this.props.title}
              </h2>

              <h6 className = 'flow-text left-align grey-text text-lighten-2'>
                Location
              </h6>

              <h6 className = 'flow-text text-justify'>
                {this.props.summary}
              </h6>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
