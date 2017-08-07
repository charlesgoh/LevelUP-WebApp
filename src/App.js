import React, {Component} from 'react';
import * as FirebaseService from './FirebaseService';
import ListingInstance from './ListingInstance';
import { Slider, Slide, Preloader } from 'react-materialize';

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
      var data = snapshot.val();

      Object.keys(data).forEach(function(key) {
        Object.keys(data[key]).forEach(function(item) {
          data[key][item]["uid"] = key;
          data[key][item]["id"] = item;
          arr.push(data[key][item]);
        });
      });

      if(this.props.location.state){
        if (this.props.location.state.sortOrder !== "0"){
          if (this.props.location.state.sortOrder === "1"){
            arr.sort(function(a, b){
              return parseInt(a.price, 10) - parseInt(b.price, 10);
            })
          }
          else {
            arr.sort(function(a, b){
              return parseInt(b.price, 10) - parseInt(a.price, 10);
            })
          }
        }

        if (this.props.location.state.category !== "0"){
          var filterOrder = this.props.location.state.category
          var array = arr.filter(function(item){
            return item.category.toString() === filterOrder;
          });
          this.setState({
            display: array,
            listings: arr
          });
        }
        else {
          this.setState({
            display: arr,
            listings: arr
          });
        }
      }

      else {
        this.setState({
          listings: arr,
          display: arr});
        }
    });
  }

  render() {
    var carousel = (
      <Slider>
        <Slide src="https://lorempixel.com/800/400/sports/1" title="Tagline">
          Slogan for slide 1
        </Slide>
        <Slide src="https://lorempixel.com/800/400/sports/2" title="Tagline" placement="left">
          Slogan for slide 2
        </Slide>
        <Slide src="https://lorempixel.com/800/400/sports/3" title="Tagline" placement="right">
          Slogan for slide 3
        </Slide>
        <Slide src="https://lorempixel.com/800/400/sports/6" title="Tagline" placement="left">
          Slogan for slide 4
        </Slide>
        <Slide src="https://lorempixel.com/800/400/sports/8" title="Tagline" placement="right">
          Slogan for slide 5
        </Slide>
      </Slider>
    );

    var list = (
      <div className = "center">
        <br/>
        <br/>
        <br/>
        <Preloader size="big" flashing/>
      </div>
    );

    if(this.state.display !== 1){
      list = this.state.display.map(item =>
        <ListingInstance key={item.id} uid={item.uid} title={item.title} summary={item.summary} price={item.price} location={item.location}/>
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
