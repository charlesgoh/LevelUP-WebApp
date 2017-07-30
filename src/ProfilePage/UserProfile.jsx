import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { Modal, Button, CardPanel, Row, Col } from 'react-materialize';
import styles from '../GlobalStyles.css';

export default class ProfilePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      editable: false,
      description: '',
      name: '',
      photoURL: '',
      warning: ''
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
    }
  }

  handleChange(event) {
    this.setState({description: event.target.value});
  }

  componentDidMount() {
    let self = this;
    var firebaseRef = firebase.database().ref();
    var getReviews = firebase.database().ref('/reviews').orderByKey();
    var offerRef = firebase.database().ref('/offers');

    var arr = [];
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
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render () {
    var clickable = {
      cursor: "pointer"
    };

    var user = firebase.auth().currentUser;
    var uid = (user ? user.uid : "");
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

    return (
      <CardPanel className="z-depth-1">
        <div className = "container">
          <Row className = 'row'>
            <Col s={9}>
              {!this.state.editable ?
                <h3 className = 'flow-text left-align overflow-control'>
                  {description}
                </h3>
                :
                <form onSubmit={this.handleSubmit}>
                  <div className = "input-field">
                    <textarea defaultValue= {description} type="text" className="materialize-textarea" onChange={this.handleChange}></textarea>
                  </div>
                </form>
              }
            </Col>
            <Col s={3} className='center-align'>
              {user !== null && user.uid === this.props.uid ?
                <div className = 'center-align flow-text'>
                 <a className="center-align" onClick={this.setEditFlag} type="submit" style={clickable}>
                   {this.state.editable ? "Update" : "Edit"}
                 </a>
               </div>
               :
               ''
             }

              {/* Display User's profile photo */}
               <img src = {photoURL} className = 'circle responsive-img' alt=""/>

              {/* Display User's Name */}
              <h4 className="center-align overflow-control">{name}</h4>

              {/* Chat or Inbox Button */}
              {uid === this.props.uid ?
                <Link to={{
                  pathname: "/inbox"
                }}>
                  <Button waves='light' className="red darken-4">
                    INBOX
                  </Button>
                </Link>
                :
                <Link to={{
                  pathname: "/message/id?=" + this.props.uid
                }}>
                  <Button waves='light' className="red darken-4">
                    CHAT
                  </Button>
                </Link>
              }
            </Col>
          </Row>
        </div>
      </CardPanel>

    );
  }
};
