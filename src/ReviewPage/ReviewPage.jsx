import React, { Component } from 'react';
import firebase from 'firebase';
import * as FirebaseService from '../FirebaseService.jsx';
import ReviewObject from './ReviewObject.jsx';

export default class ReviewPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      reviews: 1
    };
  }

  componentDidMount() {
    let self = this;
    var firebaseDB = FirebaseService.firebaseDB;
    var getListings = firebaseDB.ref('/reviews').orderByKey();
    var arr = [];

    getListings.on('value', snapshot => {
      try{
        var data = snapshot.val()["self.props.location.state.uid"];
        Object.keys(data).forEach(function(key) {
          data[key]["uid"] = key;
          arr.push(data[key]);
        });
        this.setState({
          reviews: arr});
      }

      catch(err){
        this.setState({
          reviews: 2
        });
      }
    });

  }

  render () {
    var clickable = {
      cursor: "pointer"
    };

    var list = "Patience is a great virtue in our fast-paced world.";
    var score = "";

    if(this.state.reviews === 2){
      return (
        <div className="center-align">
          <h3 className="red-text">
            No reviews yet!
          </h3>
          {firebase.auth().curretUser ? "Add a review?" : ""}
        </div>
      );
    }

    if(this.state.reviews !== 1){
      list = this.state.reviews.map(item =>
        <ReviewObject key={item.uid} name={item.name} score={item.score} title={item.title} feedback={item.feedback} photoURL={item.photoURL}/>
      );

      score = this.state.reviews.reduce(function(sum, value){
        console.log(sum);
        console.log(value);
          return sum + parseInt(value.score);
      }, 0);

      score /= this.state.reviews.length;
      score = score.toPrecision(3);
    }

    return (
    <div>
      <div className="center-align">
        {score}
      </div>
      <div className="container center-align">
        {list}
      </div>
    </div>
    );
  }
}
