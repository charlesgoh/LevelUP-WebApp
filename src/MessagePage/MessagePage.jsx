import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Input, CardPanel } from 'react-materialize';

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
      confirmed: false,
      confirmedOthUser: false
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
    var ownerUid = window.location.search.slice(2);
    var user = firebase.auth().currentUser;
    var uid = (user ? user.uid : "");

    if (this.state.messages){
      inbox = this.state.messages.map(message =>
        message.owner === ownerUid ?
          <Row>
            <Col s={10} m={9}>
              <CardPanel className="z-depth-1 grey lighten-5 left-align">
                <p className="blue-text">
                  {message.message}
                </p>
              </CardPanel>
            </Col>
            <Col s={2} m={3}>
            </Col>
          </Row>
        :
          <Row>
            <Col s={2} m={3}>
            </Col>
            <Col s={10} m={9}>
              <CardPanel className="z-depth-1 grey lighten-5 right-align">
                <p className="red-text">
                  {message.message}
                </p>
              </CardPanel>
            </Col>
          </Row>
      );
    }

    if (!uid){
      return (
        <CardPanel className="center-align red darken-4">
          <h3 className="white-text">
            You are not logged in. Please log in before trying again.
          </h3>
        </CardPanel>
      );
    }

    return (
      <div>
        <CardPanel className="center-align red darken-4">
          <Row>
            <Col s={12} className="center-align">
              <img src={this.state.photoUrl} height="80" width="80" alt="" className="circle responsive-img" />
              <Link to={{pathname: "/profile/id?=" + ownerUid}}>
                <h3 className="white-text">
                  {this.state.name}
                </h3>
              </Link>
            </Col>
          </Row>
        </CardPanel>

        <Row>
          <Col s={6} className="center-align">
            {this.state.confirmed ?
              <Button waves='light' className="disabled">
                Trade confirmed!
              </Button> :
              <Button waves='light' onClick={this.handleOfferChange}>
                {this.state.offerStatus ? "Withdraw offer" : "Make an offer"}
              </Button>}
          </Col>
          <Col s={6} className="center-align">
            {this.state.confirmedOthUser ?
              <Button waves='light' className="disabled">
                Trade confirmed!
              </Button>
              :
              (this.state.hasOffer ?
                <Button waves='light' onClick={this.handleOfferSubmit}>
                  Accept offer
                </Button>
                :
                <p>
                  No offers right now
                </p>)
              }
          </Col>
        </Row>

        <div className="container">
          {inbox}
        </div>

        <form onSubmit={this.handleMessageSubmit}>
          <Input className="container" value={this.state.currentMessage} onChange={this.handleMessageChange} />

          <Button waves='light' type="submit">
            Send
          </Button>
        </form>
      </div>
    );
  }

}
