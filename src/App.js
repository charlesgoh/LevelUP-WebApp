import React, {Component} from 'react';
import * as FirebaseService from './FirebaseService';
import ListingInstance from './ListingInstance';

export default class App extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   listings: {}
    // };

    // this.updateListings = this.updateListings.bind(this);
  };

  // componentDidMount() {
  //   var getListings = this.updateListings();
  //   // console.log(getListings);
  //   this.setState({
  //     listings: getListings
  //   });
  //   console.log(getListings);
  //   console.log(this.state);
  // }

  updateListings() {
    var firebaseDB = FirebaseService.firebaseDB;
    var getListings = firebaseDB.ref('/listings').orderByKey();
    var arr = [];

    getListings.on('value', function(snapshot) {
      console.log(snapshot.val());
      var data = snapshot.val();
      Object.keys(data).forEach(function(key) {
        data[key]["uid"] = key;
        arr.push(data[key]);
      });
    });
    console.log("This is arr", arr);

    return arr;
  }

  render() {
    var listingsArray = this.updateListings();

    var carousel = (
      <div className="carousel carousel-slider center" data-indicators="true">
        <div className="carousel-fixed-item center">
          <a className="btn waves-effect white grey-text darken-text-2">button</a>
        </div>
        <div className="carousel-item red white-text" href="#one!">
          <h2>First Panel</h2>
          <p className="white-text">This is your first panel</p>
        </div>
        <div className="carousel-item amber white-text" href="#two!">
          <h2>Second Panel</h2>
          <p className="white-text">This is your second panel</p>
        </div>
        <div className="carousel-item green white-text" href="#three!">
          <h2>Third Panel</h2>
          <p className="white-text">This is your third panel</p>
        </div>
        <div className="carousel-item blue white-text" href="#four!">
          <h2>Fourth Panel</h2>
          <p className="white-text">This is your fourth panel</p>
        </div>
      </div>
    );

    return (
      <div>
        {carousel}
        {
          listingsArray.map((element, index) => {
            <h1>{index}</h1>
          })
        }
      </div>
    );
  }
};
