import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { Row, Col, CardPanel } from 'react-materialize';
import '../GlobalStyles.css';

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

    var messageClients = "";

    if (this.state.clients){
      messageClients = this.state.clients.map(item =>
        <CardPanel>
          <Row>
            <Col s={3}>
              <img src={item.photoUrl} alt="" className="circle responsive-img" />
            </Col>
            <Col s={9}>
              <Link to={{pathname: "/message/id?=" + item.key}}>
                <h4 className="black-text overflow-control">
                  {item.name}
                </h4>
              </Link>
              <h5 className="overflow-control">
                {item.latestMessage}
              </h5>
            </Col>
          </Row>
        </CardPanel>
      );
    }

    return (
      <div>
        {messageClients}
      </div>
    );
  }
}
