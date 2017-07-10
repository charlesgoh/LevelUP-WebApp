import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

export default class Inbox extends Component {
  constructor(props){
    super(props);
    this.state = {
      clients: [],
      clientDic: {}
    };
  }

  componentDidMount(){
    var messagesRef = firebase.database().ref('/messages');
    var userRef = firebase.database().ref('/users');

    messagesRef.on('child_added', snapshot => {
      var data = snapshot.val();
      var uid = (firebase.auth().currentUser ? firebase.auth().currentUser.uid : '');
      if ((data["owner"] === uid  ||  data["recipient"] === uid)){
        var clientDic = this.state.clientDic;
        var otherUserUid = (data["owner"] === uid ? data["recipient"] : data["owner"]);
        if (!clientDic[otherUserUid]){
          clientDic[otherUserUid] = {key: otherUserUid};
        }
        clientDic[otherUserUid].message = data["message"];
      }
      this.setState({clientDic: clientDic});
    });

    userRef.once('value', snapshot => {
      var data = snapshot.val();
      var clientDic = this.state.clientDic;
      var allClient = this.state.clients;

      for (var key in clientDic) {
        var userKey = clientDic[key].key;
        var otherUser = data[userKey];
        var newUserInboxMessage = {
          name: otherUser["name"],
          photoUrl: otherUser["photoURL"],
          latestMessage: clientDic[key].message,
          key: userKey
        }
        allClient.push(newUserInboxMessage);
      };

      this.setState({clients: allClient});
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
                pathname: "/message/id?=" + item.key,
                state: {
                  uid: item.key
                }}}>
                <h4>{item.name}</h4>
              </Link>
              <h5>
                {item.latestMessage}
              </h5>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        {messageClients}
      </div>
    );
  }
}
