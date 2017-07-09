import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

export default class Inbox extends Component {
  constructor(props){
    super(props);
    this.state = {
      clients: []
    };
  }

  componentDidMount(){
    var messagesRef = firebase.database().ref('/messages');
    var userRef = firebase.database().ref('/users');

    messagesRef.on('child_added', snapshot => {
      var data = snapshot.val();
      var uid = (firebase.auth().currentUser ? firebase.auth().currentUser.uid : '');
      if ((data["owner"] === uid  ||  data["recipient"] === uid)){
        var allClient = this.state.clients;
        console.log(allClient);
        var otherUserUid = (data["owner"] === uid ? data["recipient"] : data["owner"]);
        if (!allClient[otherUserUid]){
          allClient.push({otherUserUid});
        }
      }
      this.setState({clients: allClient});
    });

    userRef.once('value', snapshot => {
      var data = snapshot.val();
      var allClient = this.state.clients;

      Object.keys(allClient).forEach(function(key) {
        var userKey = allClient[key].otherUserUid;
        var otherUser = data[userKey];
        allClient[key].name = otherUser["name"];
        allClient[key].photoUrl = otherUser["photoURL"];
      });

      this.setState({clients: allClient});
      console.log(this.state.clients);
    });
  }

  render(){

    var messageClients = "Time stops!";
    if (this.state.clients){
      messageClients = this.state.clients.map(item =>
        <div className="card-panel">
          <div className="row">
            <div className="col s3">
              <img src={item.photoUrl} alt="" className="circle responsive-img" />
            </div>
            <div className="col s9">
              <Link to={{
                pathname: "/message/?id=" + item.otherUserUid,
                state: {
                  uid: item.otherUserUid
                }}}>
                <h4>{item.name}</h4>
              </Link>
            </div>
          </div>
        </div>
      );
    }
    console.log(messageClients);
    return (
      <div>
        {messageClients}
      </div>
    );
  }
}
