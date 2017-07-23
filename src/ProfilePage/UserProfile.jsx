import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { Modal, Button, CardPanel, Row, Col } from 'react-materialize';
import ReviewObject from './ReviewObject.jsx';
import styles from '../GlobalStyles.css';

export default class ProfilePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      editable: false,
      description: '',
      name: '',
      photoURL: '',
      reviews: '',
      score: '',
      list: 'No reviews added yet!',
      allowReview: false,
      editReviewFlag: false,
      myReview: '',
      myTitle: '',
      myScore: 5,
      warning: ''
    };

    this.setEditFlag = this.setEditFlag.bind(this);
    this.setReviewFlag = this.setReviewFlag.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleReviewChange = this.handleReviewChange.bind(this);
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

  setReviewFlag() {
    if(this.state.editReviewFlag){
      if(!this.state.myReview || !this.state.myTitle || !this.state.myScore){
        this.setState({
          warning: "Please fill in all required fields."
        });
        return;
      }
      if(isNaN(this.state.myScore) || !isFinite(this.state.myScore)){
        this.setState({
          warning: "Please leave a numerical score."
        });
        return;
      }
    }
    this.setState({
      editReviewFlag: !this.state.editReviewFlag
    });

    if(this.state.editReviewFlag){
        var user = firebase.auth().currentUser;
        firebase.database().ref('reviews/' + this.props.uid + '/' + user.uid).update({
          feedback: this.state.myReview,
          title: this.state.myTitle,
          score: 5,
          photoURL: user.photoURL
        });
        console.log("Pushed review into database.");
    }
  }

  handleChange(event) {
    this.setState({description: event.target.value});
  }

  handleReviewChange(event) {
    this.setState({myReview: event.target.value});
  }

  handleTitleChange(event) {
    this.setState({myTitle: event.target.value});
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

    offerRef.on('value', snapshot => {
      var otherUserUid = window.location.search.slice(2);
      var uid = (firebase.auth().currentUser ? firebase.auth().currentUser.uid : '');
      var data = snapshot.val();
      if (data[uid]){
        if (data[uid][otherUserUid]){
          this.setState({
            allowReview: data[uid][otherUserUid]["confirmed"]
          });
        }
      }

      if (data[otherUserUid]){
        if (data[otherUserUid][uid]){
          this.setState({
            allowReview: this.state.allowReview || data[otherUserUid][uid]["confirmed"]
          });
        }
      }
    });

    getReviews.on('value', snapshot => {
      try{
        var uid = self.props.uid;
        var data = snapshot.val()[uid];
        var selfUid = (firebase.auth().currentUser ? firebase.auth().currentUser.uid : '');
        if (data[selfUid]){
          this.setState({
            myReview: data[selfUid]["feedback"],
            myTitle: data[selfUid]["title"],
            myScore: data[selfUid]["score"]
          });
        }

        Object.keys(data).forEach(function(key) {
          data[key]["uid"] = key;
          arr.push(data[key]);
        });

        var list = arr.map(function(item){
          return <ReviewObject key={item.uid} name={item.name} score= {item.score} title={item.title} feedback={item.feedback} photoURL={item.photoURL}/>
        });

        var score = arr.reduce(function(sum, value){
          return sum + parseInt(value.score, 10);
        }, 0);

        score /= arr.length;
        score = score.toPrecision(3);
        this.setState({
          reviews: arr,
          score: score,
          list: list
          });
      }

      catch(err){
        this.setState({
          reviews: ''
        });
      }

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
                  <Button waves='light'>
                    INBOX
                  </Button>
                </Link>
                :
                <Link to={{
                  pathname: "/message/id?=" + this.props.uid
                }}>
                  <Button waves='light'>
                    CHAT
                  </Button>
                </Link>
              }

              <Modal
                className='overflow-control'
              	header={'Reviews for ' + name}
              	trigger={
                  <div>
                		<br/>
                    <Button waves='light'>Reviews</Button>
                  </div>
              	}>
                {this.state.allowReview ?
                   <a className="center-align" onClick={this.setReviewFlag} type="submit" style={clickable}>
                     {this.state.editReviewFlag ? "Update" : "Add/Edit Review"}
                   </a>
                : ""}
                {this.state.editReviewFlag ?
                  <div>
                    <form onSubmit={this.handleSubmit}>
                      <div className = "input-field">
                        <p> Title </p>
                        <textarea defaultValue= {this.state.myTitle} type="text" className="materialize-textarea" onChange={this.handleTitleChange}></textarea>
                      </div>
                      <div className = "input-field">
                        <textarea defaultValue= {this.state.myReview} type="text" className="materialize-textarea" onChange={this.handleReviewChange}></textarea>
                      </div>
                    </form>
                    <p className='red-text text-darken-1'>
                      {this.state.warning}
                    </p>
                  </div>
                :
                <div>
                  <div className="center-align">
                    <h3>
                      Overall Score: {this.state.score}
                    </h3>
                  </div>
                  <div className="container center-align">
                    {this.state.list}
                  </div>
                </div>}
              </Modal>

            </Col>
          </Row>
        </div>
      </CardPanel>

    );
  }
};
