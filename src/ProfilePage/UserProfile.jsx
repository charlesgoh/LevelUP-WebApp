import React, { Component } from 'react';
import firebase from 'firebase';

export default class ProfilePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      editable: false,
      description: '',
      name: '',
      photoURL: ''
    };

    this.setEditFlag = this.setEditFlag.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  setEditFlag() {
    this.setState({
      editable: !this.state.editable
    });

    if(this.state.editable){
        var user = firebase.auth().currentUser;
        firebase.database().ref('users/' + user.uid).update({
          description: this.state.description
        });
        console.log("Pushed data into database.");
    }
  }

  handleChange(event) {
    this.setState({description: event.target.value});
  }

  componentDidMount() {
    let self = this;
    var firebaseRef = firebase.database().ref();
    firebaseRef.once('value')
      .then(function(snapshot) {
        var uid = self.props.uid;
        var db = snapshot.val();
        self.setState({
          description: db["users"][uid]["description"],
          name: db["users"][uid]["name"],
          photoURL: db["users"][uid]["photoURL"]
        });
    });
    console.log(this.state);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render () {
    var clickable = {
      cursor: "pointer"
    };

    var user = firebase.auth().currentUser;
    var photoURL = "";
    var description = "";
    var name = "";

    if (user === null) {
      photoURL = this.state.photoURL;
      description = this.state.description;
      name = this.state.name;
    } else if (user.uid === this.state.uid) {
      photoURL = user.photoURL;
      description = user.description;
      name = user.name;
    } else {
      photoURL = this.state.photoURL;
      description = this.state.description;
      name = this.state.name
    }

    // console.log(photoURL);
    // console.log(description);
    // console.log(name);

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
              {user !== null && user.uid === this.props.uid ?
                <div className = 'center-align flow-text'>
                 <a className="center-align" onClick={this.setEditFlag} type="submit" style={clickable}>
                   {this.state.editable ? "Update" : "Edit"}
                 </a>
               </div> : ''}

              {/* Display User's profile photo */}
               <img src = {photoURL} className = 'circle responsive-img' alt=""/>

              {/* Display User's Name */}
              <h4 className="center-align">{name}</h4>

              {/* Chat or Inbox Button => To be implemented later  */}
              <button className="center-align btn-large waves-effect waves-light">
                {user? "INBOX" : "CHAT"}
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  }
};
