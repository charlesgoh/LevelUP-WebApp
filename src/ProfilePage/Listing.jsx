import React, { Component } from 'react';

export default class Listing extends Component {
  render () {
    return (
      <div className = "card-panel z-depth-1">
        <div className = "container">
          <h6 className = 'flow-text grey-text text-lighten-2 right-align'>
            edit
          </h6>
          <div className = 'row'>
            <div className = 'col s4 left-align'>
              <br />
              <h6 className = 'flow-text grey-text text-lighten-2'>
                PRICE
              </h6>

              <h5 className = 'flow-text yellow-text text-darken-4'>
                $400
              </h5>

              <h6 className = 'flow-text grey-text text-lighten-2'>
                PER HOUR
              </h6>
            </div>

            <div className = 'col s8'>

              <h2 className = 'flow-text red-text text-darken-4'>
                Listing name
              </h2>

              <h6 className = 'flow-text left-align grey-text text-lighten-2'>
                Location
              </h6>

              <h6 className = 'flow-text grey-text text-lighten-2'>
                He sat down and contemplated, for what he would do next could possibly alter the fate
                of humanity forever.
                In the face of such responsibility, the man ultimately chose the most cowardly path of self-humiliation.
              </h6>
            </div>

          </div>
        </div>
      </div>
    );
  }
};
