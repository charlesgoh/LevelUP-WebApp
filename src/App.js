import React, {Component} from 'react';
import * as FirebaseService from './FirebaseService';
import ListingInstance from './ListingInstance';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
       listings: 1,
       display: 1,
       item: {
          key: "",
          title: "",
          summary: "",
          price: ""
       },
       sortFlag: ""
     };
  };

  componentWillReceiveProps(nextProps){
    if (this.state.display !== 1){
      if (!nextProps.location.state){
        return;
      }
      if (nextProps.location.state.sortOrder !== "0"){
        if (nextProps.location.state.sortOrder === "1"){
          this.state.listings.sort(function(a, b){
            return parseInt(a.price, 10) - parseInt(b.price, 10);
          })
        }
        else {
          this.state.listings.sort(function(a, b){
            return parseInt(b.price, 10) - parseInt(a.price, 10);
          })
        }
      }

      if (nextProps.location.state.category !== "0"){
        var array = this.state.listings.filter(function(item){
          return item.category.toString() === nextProps.location.state.category;
        });
        this.setState({
          display: array
        });
      }
      else {
        this.setState({
          display: this.state.listings
        });
      }
    }
  }

  componentDidMount() {
    var firebaseDB = FirebaseService.firebaseDB;
    var getListings = firebaseDB.ref('/listings').orderByKey();
    var arr = [];

    getListings.on('value', snapshot => {
      console.log(snapshot.val());
      var data = snapshot.val();
      Object.keys(data).forEach(function(key) {
        data[key]["uid"] = key;
        arr.push(data[key]);
      });
      this.setState({
        listings: arr,
        display: arr});
    });
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

    var list = "Loading listings. Please wait...";

    if(this.state.display !== 1){
      list = this.state.display.map(item =>
        <ListingInstance key={item.uid} uid={item.uid} title={item.title} summary={item.summary} price={item.price}/>
      );
    }

    return (
      <div>
        {carousel}
        {list}
      </div>
    );
  }
};
