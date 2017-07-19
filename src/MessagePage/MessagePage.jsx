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
      name: "",
      offerStatus: false,
      hasOffer: false,
      confirmed: false
    };

    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    this.handleOfferChange = this.handleOfferChange.bind(this);
    this.handleOfferSubmit = this.handleOfferSubmit.bind(this);
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

  handleOfferChange(){
    var user = firebase.auth().currentUser;
    var otherUserUid = window.location.search.slice(2);
    firebase.database().ref('offers/' + user.uid + '/' + otherUserUid).update({
      offerMade: !this.state.offerStatus,
      confirmed: false
    });

    var offerMessage = this.state.offerStatus ? "Withdrew offer" : "Made new offer";
    firebase.database().ref('messages/').push({
      owner: user.uid,
      recipient: otherUserUid,
      message: offerMessage
    });

    this.setState({
      offerStatus: !this.state.offerStatus
    });
  }

  handleOfferSubmit(){
    var user = firebase.auth().currentUser;
    var otherUserUid = window.location.search.slice(2);
    firebase.database().ref('offers/' + otherUserUid + '/' + user.uid).update({
      confirmed: true
    });

    var offerMessage = "Trade Accepted!";
    firebase.database().ref('messages/').push({
      owner: user.uid,
      recipient: otherUserUid,
      message: offerMessage
    });

    this.setState({
      confirmedOthUser: true
    });
  }

  componentDidMount(){
    var messagesRef = firebase.database().ref('/messages');
    var userRef = firebase.database().ref('/users');
    var offerRef = firebase.database().ref('/offers');

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

    /* Database structure:
      > UserA
        > UserB
          > OfferMade: boolean
          > Confirmed: false

      UserA: the user who makes the offer
      UserB: the user who receives the offer
      OfferMade: the status of the offer from UserA to UserB
      Confiemed: set to true, once OfferMade is true and UserB accepts.

      For clarity's sake:
        offerStatus: status of the offer from me to you
        hasOffer: status of the offer from you to me
    */
    offerRef.on('value', snapshot => {
      var otherUserUid = window.location.search.slice(2);
      var uid = (firebase.auth().currentUser ? firebase.auth().currentUser.uid : '');
      var data = snapshot.val();
      if (data[uid]){
        if (data[uid][otherUserUid]){
          this.setState({
            offerStatus: data[uid][otherUserUid]["offerMade"],
            confirmed: data[uid][otherUserUid]["confirmed"]
          });
        }
      }
      if (data[otherUserUid]){
        if (data[otherUserUid][uid]){
          this.setState({
            hasOffer: !data[otherUserUid][uid]["confirmed"],
            confirmedOthUser: data[otherUserUid][uid]["confirmed"]
          });
        }
      }
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


        <div className="row">
          <div className="col s6 center-align">
            {this.state.confirmed ?
              <button className="disabled">
                Trade confirmed!
              </button> :
              <button onClick={this.handleOfferChange}>
                {this.state.offerStatus ? "Withdraw offer" : "Make an offer"}
              </button>}
          </div>
          <div className="col s6 center-align">
            {this.state.confirmedOthUser ?
              <button className="disabled">
                Trade confirmed!
              </button> :
              (this.state.hasOffer ?
                <button onClick={this.handleOfferSubmit}>
                  Accept offer
                </button> :
                <p>
                  No offers right now
                </p>)
              }
          </div>
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
