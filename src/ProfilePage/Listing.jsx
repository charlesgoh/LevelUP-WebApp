import React, { Component } from 'react';
import firebase from 'firebase';
import * as FirebaseService from '../FirebaseService.jsx';

export default class Listing extends Component {

  constructor(props) {
    super(props);

    this.state = {
      editable: false,
      summary: "",
      title: ""
    };

    this.setEditFlag = this.setEditFlag.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  setEditFlag() {
    this.setState({
      editable: !this.state.editable
    });

    if(this.state.editable){
      var user = firebase.auth().currentUser;
      firebase.database().ref('listings/' + user.uid).update({
        summary: this.state.summary,
        title: this.state.title
      });
      console.log("Pushed data into database.");
    }
  }

  componentDidMount() {
    firebase.database().ref().on("value", snapshot => {
      var thisUser = snapshot.val();
      var uid = window.localStorage.getItem(FirebaseService.storageKey);

      if (!thisUser["listings"] || !thisUser["listings"][uid]) {
        console.log("No entries. First write to db");
        
        this.setState({
          summary: "Listing Summary",
          title: "Title of Listing"
        });
      } else {
        this.setState({
          summary: thisUser["listings"][uid]["summary"],
          title: thisUser["listings"][uid]["title"]
        });
      }
    });
  }

  handleChange(event) {
    this.setState({summary: event.target.value});
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value});
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
                {this.state.title}
              </h2>:
              <form onSubmit={this.handleSubmit}>
                <div className = "input-field">
                  <input defaultValue= {this.state.title} type="text" className="materialize-textarea flow-text red-text text-darken-4" onChange={this.handleTitleChange}></input>
                </div>
              </form>
              }

              <h6 className = 'flow-text left-align grey-text text-lighten-2'>
                Location
              </h6>

              {!this.state.editable ? <h6 className = 'flow-text text-justify'>
                {this.state.summary}
              </h6>:
              <form onSubmit={this.handleSubmit}>
                <div className = "input-field">
                  <textarea defaultValue= {this.state.summary} type="text" className="materialize-textarea" onChange={this.handleChange}></textarea>
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
