import React, {Component} from 'react';
import * as FirebaseService from './FirebaseService';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listings: {}
    };

    this.updateListings = this.updateListings.bind(this);
  };

  componentDidMount() {
    var getListings = this.updateListings();
    // console.log(getListings);
    this.setState({
      listings: getListings
    });
    console.log(getListings);
  }

  updateListings() {
    var firebaseDB = FirebaseService.firebaseDB;
    var getListings = firebaseDB.ref('/listings').orderByKey();
    var savedListings = {};

    getListings.on('value', function(snapshot) {
      snapshot.forEach(function(child) {
        // console.log(child.key, child.val());
        savedListings[child.key] = child.val();
        // console.log(savedListings);
      })
    })

    return savedListings;
  }

  render() {
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

    // console.log(this.state.listings);
    return (
      <div>
        {carousel}
        <h1 className="center">This is the Homepage</h1>
        {}
      </div>
    );
  }
};
