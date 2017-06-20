import React, { Component } from 'react';
import firebase from 'firebase';
import * as FirebaseService from '../FirebaseService.jsx';


export default class ProfilePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      editable: false,
      description: ''
    };

    this.setEditFlag = this.setEditFlag.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  setEditFlag() {
    this.setState({
      editable: !this.state.editable
    });
  }

  handleChange(event) {
    var user = firebase.auth().currentUser;
    this.setState({description: event.target.value});

    firebase.database().ref('users/' + user.uid).update({
      description: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }
  render () {
    console.log("Entered render part");
    var clickable = {
      cursor: "pointer"
    };

    var user = firebase.auth().currentUser;
    console.log("User is now: " + user);
    var name = '';
    var photoUrl = '';
    var description = "";

    var uid = window.localStorage.getItem(FirebaseService.storageKey);
    console.log("storageKey is: " + uid);
    firebase.database().ref().on("value", function(snapshot) {
      var thisUser = snapshot.val();
      console.log(thisUser["users"][uid]["description"]);
      description = thisUser["users"][uid]["description"];
    }, function (error) {
      console.log("Error: " + error.code);
    });

    if (user){
      console.log("User is " + user);
      this.state.description = user.description;
      name = user.displayName;
      photoUrl = user.photoURL;
      if (!this.state.description){
        description = "Description"
      }
      else {
        description = this.state.description;
      }
    }

    return (
      <div className = "card-panel z-depth-1">
        <div className = "container">
          <div className = 'row'>
            <div className = 'col s9'>
              {!this.state.editable ? <h3 className = 'flow-text left-align'>
                {description}
              </h3>:
              <form onSubmit={this.handleSubmit}>
                <div className = "input-field">
                  <textarea defaultValue= {description} type="text" className="materialize-textarea" onChange={this.handleChange}></textarea>
                </div>
              </form>
              }
            </div>
            <div className = 'col s3 center-align'>
              {user ?
                <div className = 'center-align flow-text'>
                 <a className="center-align" onClick={this.setEditFlag} type="submit" style={clickable}>
                   {this.state.editable ? "Update" : "Edit"}
                 </a>
               </div> : ''}

              <img src = {photoUrl} className = 'circle responsive-img' alt=""/>
              <h4 className="center-align">{name}</h4>
              <button className="center-align btn-large waves-effect waves-light">
                {user? "Messages" : "Message"}
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  }
};
