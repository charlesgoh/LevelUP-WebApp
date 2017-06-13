import React, { Component }from 'react';
import './CategoryPage.css';

export default class SortFilter extends Component {
  render() {
    return (
      <div className = 'card-panel z-depth-1'>
        <p className = 'grey-text text-lighten-1 center-align'>
          Sort/Filter
        </p>

        <div className = 'container center-align grey lighten-2 round-corners'>
          <a href = '#' className = 'grey-text text-darken-1'>
            <div className = 'row valign-wrapper  '>
              <div className = 'col s1'>
                <i className = 'small material-icons'>
                  room
                </i>
              </div>
              <div className = 'col s10 text-grey left-align'>
                Location
              </div>
            </div>
          </a>
        </div>


        <div className = 'container center-align grey lighten-2 round-corners'>
          <a href = '#' className = 'grey-text text-darken-1'>
            <div className = 'row valign-wrapper'>
              <div className = 'col s1'>
                <i className = 'small material-icons'>
                  credit_card
                </i>
              </div>
              <div className = 'col s10 text-grey left-align'>
                Price/Hour
              </div>
            </div>
          </a>
        </div>

      </div>
    );
  }
};
