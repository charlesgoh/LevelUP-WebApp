import React, { Component }from 'react';
import './CategoryPage.css';

export default class SortFilter extends Component {
  render() {
    return (
      <div className = 'card-panel z-depth-1'>
        <p className = 'grey-text text-lighten-1 center-align'>
          Sort/Filter
        </p>

        <div className = 'container center-align grey lighten-2'>
          <div className = 'row'>
            <div className = 'input-field col s6'>
              <i className = 'material-icons prefix'>
                room
              </i>
              <input id="location" type="text" className="validate" />
              <label for="location">
                Location
              </label>
            </div>

            <div className = 'input-field col s6'>
              <i className = 'material-icons prefix'>
                credit_card
              </i>
              <input id="price-hour" type="text" className="validate" />
              <label for="price-hour">
                Price/Hour
              </label>
            </div>
          </div>


        </div>

        <div className = 'center-align'>
          <button className = 'btn waves-effect waves-light' type = 'submit' name = 'action'>
            Search
          </button>
        </div>
      </div>
    );
  }
};
