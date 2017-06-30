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

  componentWillReceiveProps(nextProps){
    var uid = nextProps.uid;
    firebase.database().ref().on("value", snapshot => {
      var thisUser = snapshot.val();
      console.log(this);
      this.setState({
        description: thisUser["users"][uid]["description"],
        name: thisUser["users"][uid]["name"],
        photoUrl: thisUser["users"][uid]["photoURL"]
      });
    });
    console.log(this.state);
  }

  componentDidMount(nextProps){
    if (this.props.uid){
      var uid = this.props.uid;
      firebase.database().ref().on("value", snapshot => {
        var thisUser = snapshot.val();
        this.setState({
          description: thisUser["users"][uid]["description"],
          name: thisUser["users"][uid]["name"],
          photoUrl: thisUser["users"][uid]["photoURL"]
        });
      });
    }

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
    var myUid = "";
    if (user){
      myUid = user.uid;
    }

    console.log(this);
    console.log(myUid);
    console.log(this.props.uid);
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
              {myUid == this.props.uid ?
                <div className = 'center-align flow-text'>
                 <a className="center-align" onClick={this.setEditFlag} type="submit" style={clickable}>
                   {this.state.editable ? "Update" : "Edit"}
                 </a>
               </div> : ''}

              <img src = {this.state.photoUrl} className = 'circle responsive-img' alt=""/>
              <h4 className="center-align">{this.state.name}</h4>
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
