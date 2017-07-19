import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-materialize';
import ReviewObject from './ReviewObject.jsx';


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
      myScore: ''
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
              {user ?
                <Link to={{
                  pathname: "/inbox"
                }}>
                  <button className="center-align btn-large waves-effect waves-light">
                    INBOX
                  </button>
                </Link>:
                <Link to={{
                  pathname: "/message/id?=" + this.props.uid
                }}>
                  <button className="center-align btn-large waves-effect waves-light">
                    CHAT
                  </button>
                </Link>
              }

              <Modal
              	header={'Reviews for ' + name}
              	trigger={
              		<Button waves='light'>Reviews</Button>
              	}>
                {this.state.allowReview ?
                   <a className="center-align" onClick={this.setReviewFlag} type="submit" style={clickable}>
                     {this.state.editReviewFlag ? "Update" : "Add/Edit Review"}
                   </a>
                : ""}
                {this.state.editReviewFlag ?
                  <form onSubmit={this.handleSubmit}>
                    <div className = "input-field">
                      <p> Title </p>
                      <textarea defaultValue= {this.state.myTitle} type="text" className="materialize-textarea" onChange={this.handleTitleChange}></textarea>
                    </div>
                    <div className = "input-field">
                      <textarea defaultValue= {this.state.myReview} type="text" className="materialize-textarea" onChange={this.handleReviewChange}></textarea>
                    </div>
                  </form>
                :
                <div>
                  <div className="center-align">
                    {this.state.score}
                  </div>
                  <div className="container center-align">
                    {this.state.list}
                  </div>
                </div>}

              </Modal>


            </div>
          </div>
        </div>
      </div>

    );
  }
};
