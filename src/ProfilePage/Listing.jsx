import React, { Component } from 'react';
import firebase from 'firebase';

export default class Listing extends Component {

  constructor(props) {
    super(props);

    this.state = {
      editable: false,
      listingDescription: 'Listing Description',
      name: 'Name of Listing'
    };

    this.setEditFlag = this.setEditFlag.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  setEditFlag() {
    this.setState({
      editable: !this.state.editable
    });
  }

  handleChange(event) {
    this.setState({listingDescription: event.target.value});
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render () {
    var user = firebase.auth().currentUser;

    var clickable = {
      cursor: "pointer"
    };

    return (
      <div className = "card-panel z-depth-1">
        <div className = "container">
          {user ?
            <div className = 'right-align flow-text'>
             <a className="grey-text" onClick={this.setEditFlag} type="submit" style={clickable}>
               {this.state.editable ? "Update" : "Edit"}
             </a>
           </div> : ''}
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
              {!this.state.editable ? <h2 className = 'flow-text red-text text-darken-4'>
                {this.state.name}
              </h2>:
              <form onSubmit={this.handleSubmit}>
                <div className = "input-field">
                  <input defaultValue= {this.state.name} type="text" className="materialize-textarea flow-text red-text text-darken-4" onChange={this.handleNameChange}></input>
                </div>
              </form>
              }

              <h6 className = 'flow-text left-align grey-text text-lighten-2'>
                Location
              </h6>

              {!this.state.editable ? <h6 className = 'flow-text text-justify'>
                {this.state.listingDescription}
              </h6>:
              <form onSubmit={this.handleSubmit}>
                <div className = "input-field">
                  <textarea defaultValue= {this.state.listingDescription} type="text" className="materialize-textarea" onChange={this.handleChange}></textarea>
                </div>
              </form>
              }
            </div>

          </div>
        </div>
      </div>
    );
  }
};
