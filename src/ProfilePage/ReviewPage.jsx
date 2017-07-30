import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { Modal, Button, CardPanel, Row, Col } from 'react-materialize';
import ReviewObject from './ReviewObject.jsx';
import styles from '../GlobalStyles.css';
import Rating from 'react-rating-system';

export default class ReviewPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      editable: false,
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

    this.setReviewFlag = this.setReviewFlag.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleReviewChange = this.handleReviewChange.bind(this);
    this.handleRating = this.handleRating.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

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
          score: this.state.myScore,
          photoURL: user.photoURL
        });
    }
  }

  handleReviewChange(event) {
    this.setState({myReview: event.target.value});
  }

  handleTitleChange(event) {
    this.setState({myTitle: event.target.value});
  }

  handleRating(event){
    console.log(event);
    this.setState({myScore: event});
  }

  componentDidMount() {
    let self = this;
    var firebaseRef = firebase.database().ref();
    var getReviews = firebase.database().ref('/reviews').orderByKey();
    var offerRef = firebase.database().ref('/offers');


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
        var myReview = '';
        var myTitle = '';
        var myScore = '';
        var arr = [];
        var uid = self.props.uid;
        var data = snapshot.val()[uid];
        var selfUid = (firebase.auth().currentUser ? firebase.auth().currentUser.uid : '');

        Object.keys(data).forEach(function(key) {
          data[key]["uid"] = key;
          arr.push(data[key]);
        });

        var score = arr.reduce(function(sum, value){
          return sum + parseInt(value.score, 10);
        }, 0);

        if (data[selfUid]){
          myReview = data[selfUid]["feedback"],
          myTitle = data[selfUid]["title"],
          myScore = data[selfUid]["score"]
        }

        score /= arr.length;
        score = score.toPrecision(3);
        this.setState({
          reviews: arr,
          score: score,
          myReview: myReview,
          myTitle: myTitle,
          myScore: myScore
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

    var list = "";
    var user = firebase.auth().currentUser;
    var uid = (user ? user.uid : "");

    if(this.state.reviews){
      list = this.state.reviews.map(function(item){
        return <ReviewObject key={item.uid} name={item.name} score= {item.score} title={item.title} feedback={item.feedback} photoURL={item.photoURL}/>
      });
    }



    return (
      <div>
        {this.state.allowReview ?
           <a className="center-align" onClick={this.setReviewFlag} type="submit" style={clickable}>
             {this.state.editReviewFlag ? "Update" : "Add/Edit Review"}
           </a>
        : ""}
        {this.state.editReviewFlag ?
          <div>
            <form onSubmit={this.handleSubmit}>
              <Rating image={require('./star2.png')} fillBG="#f1c40f" containerStyle={{ maxWidth: '200px' }} callback={this.handleRating}/>
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
            {list}
          </div>
        </div>}
      </div>
    );
  }
};
