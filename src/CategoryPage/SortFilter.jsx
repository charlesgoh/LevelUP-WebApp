import React, { Component }from 'react';

export default class SortFilter extends Component {
  render() {
    return (
      <div className = 'card-panel z-depth-1'>
        <p className = 'grey-text text-darken-1 center-align'>
          Sort/Filter
        </p>

        <div className = 'center-align'>
          <div className = 'card-panel row grey lighten-2 black-text'>
            <div className = 'input-field'>
              <i className = 'material-icons prefix'>
                room
              </i>
              <select multiple>
                <option value="" disabled selected>Locations</option>
                <option value="1">North</option>
                <option value="2">Northeast</option>
                <option value="4">East</option>
                <option value="5">Southeast</option>
                <option value="6">South</option>
                <option value="7">Southwest</option>
                <option value="8">West</option>
                <option value="9">Northwest</option>
                <option value="10">Central</option>
              </select>
            </div>

            <div className = 'input-field'>
              <i className = 'material-icons prefix'>
                credit_card
              </i>
              <input id="price-hour" type="text" className="validate" placeholder="Price/Hour" />
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
