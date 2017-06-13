import React, { Component } from 'react';
// edit is not visible if !current user

export default class ListingsPage extends Component {
  render () {
    return (
      <div className = "card-panel z-depth-1">
        <div className = "container">
          <div className = 'row'>
            <div className = 'col s8'>
              <h4 className = 'left-align flow-text'>
                Create new listing
              </h4>
              <div className = 'input-field'>
                <i className = 'material-icons prefix'>
                  create
                </i>
                <input id="listName" type="text" className="validate" />
                <label for="listName">
                  Name of listing
                </label>
              </div>
            </div>

            <div className = 'col s4 center-align'>
              <img src = "https://i.imgur.com/2HxCx9i.png" className = 'circle responsive-img' />
            </div>
          </div>

          <div class="input-field col s12">
            <select multiple>
              <option value="" disabled selected>Preferred Meetup Locations</option>
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

          <div class="row">
            <form class="col s12">
              <div class="row">
                <div class="container input-field col s12">
                  <textarea id="listDescript" class="materialize-textarea">
                  </textarea>
                  <label for="listDescript">
                    Description
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className = 'center-align'>
          <button className = 'btn waves-effect waves-light' type = 'submit' name = 'action'>
            Submit
          </button>
        </div>
      </div>
    );
  }
};
