import React, { Component } from 'react';
import firebase from 'firebase';
// import * as FirebaseService from '../FirebaseService.jsx';

export default class MessagePage extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentMessage: "",
      messages: [],
      photoUrl: "",
      name: ""
    };

    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
  }

  handleMessageChange(event){
    this.setState({
      currentMessage: event.target.value
    });
  }

  handleMessageSubmit(event){
    event.preventDefault();
    var user = firebase.auth().currentUser;
    if (this.state.currentMessage){
      firebase.database().ref('messages/').push({
        owner: user.uid,
        recipient: window.location.search.slice(2),
        message: this.state.currentMessage
      });
      this.setState({currentMessage: ""});
    }
  }

  componentDidMount(){
    var messagesRef = firebase.database().ref('/messages');
    var userRef = firebase.database().ref('/users');


    messagesRef.on('child_added', snapshot => {
      var data = snapshot.val();
      var otherUserUid = window.location.search.slice(2);
      var uid = (firebase.auth().currentUser ? firebase.auth().currentUser.uid : '');
      if ((data["owner"] === uid && data["recipient"] === otherUserUid) || (data["owner"] === otherUserUid && data["recipient"] === uid)){
        var allMsg = this.state.messages;
        allMsg.push(data);
        this.setState({messages: allMsg});
      }
    });

    userRef.once('value', snapshot => {
      var otherUserUid = window.location.search.slice(2);
      var data = snapshot.val();
      var user = data[otherUserUid];
      this.setState({
        name: user.name,
        photoUrl: user.photoURL
      });
    });
  }

  render(){

    var inbox = "And now time flows again.";

    if (this.state.messages){
      inbox = this.state.messages.map(message =>
        message.owner === window.location.search.slice(2) ?
          <div className="container left-align blue-text">
            {message.message}
          </div>
        :
          <div className="container right-align red-text">
            {message.message}
          </div>
      );
    }

    var user = firebase.auth().currentUser;
    var uid = (user ? user.uid : "");

    if (!uid){
      return (
        <div className="card-panel center-align red darken-4">
          <h3 className="white-text">
            You are not logged in. Please log in before trying again.
          </h3>
        </div>
      );
    }

    return (
      <div>
        <div className="card-panel center-align red darken-4">
          {/*<img src={this.state.photoUrl} alt="" className="circle responsive-img" /> */}
          <h3 className="white-text">
            {this.state.name}
          </h3>
        </div>

        {inbox}
        <form onSubmit={this.handleMessageSubmit}>
          <div className = "container input-field">
            <input value={this.state.currentMessage} ref={'messagebox'} type="text" className="materialize-textarea" onChange={this.handleMessageChange}>
            </input>
            <button type="submit">Send</button>
          </div>
        </form>
      </div>
    );
  }

}
