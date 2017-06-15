import React, { Component } from 'react';
import firebase from 'firebase';



export default class ProfilePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      editable: false,
      initialized: false
    };

    this.setEditFlag = this.setEditFlag.bind(this);
    this.initializeUser = this.initializeUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  initializeUser(){
    var user = firebase.auth().currentUser;
    var name = '';
    var photoUrl = '';
    var description = "Verdant green, diamond blue";
    if (user){
      name = user.displayName;
      photoUrl = user.photoURL;
      if (!user.description){
        description = "Description"
      }
      else {
        description = user.description;
      }
    }
    this.setState({
      description: description,
      name: name,
      photoUrl: photoUrl,
      user: user,
      initialized: true
    })
  }

  setEditFlag() {
    this.setState({
      editable: !this.state.editable
    });
  }

  handleChange(event) {
    this.setState({description: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
  }
  render () {
    var user = firebase.auth().currentUser;
    if (user && !this.state.initialized){
      this.initializeUser();
    }

    return (
      <div className = "card-panel z-depth-1">
        <div className = "container">
          <div className = 'row'>
            <div className = 'col s9'>
              {!this.state.editable ? <h3 className = 'flow-text left-align'>
                {this.state.description}
              </h3>:
              <form onSubmit={this.handleSubmit}>
                <div className = "input-field">
                  <textarea defaultValue= {this.state.description} type="text" className="materialize-textarea" onChange={this.handleChange}></textarea>
                </div>
              </form>
              }
            </div>
            <div className = 'col s3 center-align'>
              {this.state.user ?
                <div className = 'center-align flow-text'>
                 <a className="center-align" onClick={this.setEditFlag} type="submit">
                   {this.state.editable ? "Update" : "Edit"}
                 </a>
               </div> : ''}

              <img src = {this.state.photoUrl} className = 'circle responsive-img' alt=""/>
              <h4 className="center-align">{this.state.name}</h4>
              <button className="center-align btn-large waves-effect waves-light">
                {this.state.user? "Messages" : "Message"}
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  }
};
