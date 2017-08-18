import React, { Component } from 'react';
import firebase from 'firebase';
import Listing from './Listing.jsx';
import Autocomplete from 'react-google-autocomplete';
import { Button, Row, Col, Input, CardPanel } from 'react-materialize';
import '../GlobalStyles.css';

export default class ListingsPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      editable: false,
      summary: "",
      title: "",
      price: "",
      location: "",
      warning: "",
      category: "1",
      listingNumber: 1,
      listings: [],
      validListing: false,
      addingNewListing: false
    };

    this.submitNewListing = this.submitNewListing.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
    this.callUpdate = this.callUpdate.bind(this);
    this.setAddFlag = this.setAddFlag.bind(this);
  };

  submitNewListing() {
    if(isNaN(this.state.price) || !isFinite(this.state.price)){
      this.setState({warning: "Please fill in numbers only for prices!"});
      return;
    }
    if(!this.state.summary || !this.state.title || !this.state.price){
      this.setState({warning: "Please fill in all fields."});
      return;
    }
    if(parseInt(this.state.price, 10) <= 0){
      this.setState({warning: "Please input positive numbers only."});
      return;
    }

    this.setState({
      warning: "",
      addingNewListing: false
    });

    var user = firebase.auth().currentUser;
    firebase.database().ref('listings/' + user.uid).push({
      summary: this.state.summary,
      title: this.state.title,
      price: this.state.price,
      location: this.state.location,
      category: this.state.category
    });
  }

  setAddFlag(){
    this.setState({
      addingNewListing: !this.state.addingNewListing
    });
  }
  componentWillMount() {
    let user = firebase.auth().currentUser;
    if (user) {
      this.setState({ loggedIn: true })
    };
  }

  componentDidMount() {
    var listingsRef = firebase.database().ref('/listings');


    listingsRef.on("value", snapshot => {
      var data = snapshot.val()[this.props.uid];
      var arr = [];

      if(data){
        Object.keys(data).forEach(function(key) {
          data[key]["id"] = key;
          arr.push(data[key]);
        });

        this.setState({
          listingNumber: arr.length,
          listings: arr
        })
      }
    });
  }

  callUpdate(id){
    var user = firebase.auth().currentUser;
    firebase.database().ref('listings/' + user.uid + '/' + id).remove();
    var listingsRef = firebase.database().ref('/listings');


    listingsRef.on("value", snapshot => {
      var data = snapshot.val()[this.props.uid];
      var newArr = [];

      if(data){
        Object.keys(data).forEach(function(key) {
          data[key]["id"] = key;
          newArr.push(data[key]);
        });

        this.setState({
          listingNumber: newArr.length,
          listings: newArr
        })
      }
      else {
        this.setState({
          listingNumber: 0,
          listings: []
        })
      }
    });
  }

  handlePrice(event) {
    this.setState({price: event.target.value});
  }

  handleChange(event) {
    this.setState({summary: event.target.value});
  }

  handleLocation(newLocation) {
    this.setState({location: newLocation});
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }

  handleCategoryChange(event) {
    this.setState({category: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render () {
    var uid = (firebase.auth().currentUser ? firebase.auth().currentUser.uid : "");
    var userListings = '';

    if(this.state.listings){
      userListings = this.state.listings.map(item =>
        <Listing key={item.id} id={item.id} uid={this.props.uid} title={item.title} summary={item.summary} category={item.category} price={item.price} location={item.location} callback={this.callUpdate}/>
      );
    }

    return (
      <div>
        <br />
        {this.state.addingNewListing ?
        <div>
        <CardPanel>
          <Button waves='light' onClick={this.submitNewListing}>
            Submit
          </Button>
          <div>
            <form onSubmit={this.handleSubmit}>
              <div className="input-field">
                <textarea id='title' defaultValue={this.state.title} className="materialize-textarea flow-text red-text text-darken-4" onChange={this.handleTitleChange}></textarea>
                <label for='title'> Title </label>
              </div>
            </form>

            <p> Location </p>

            <Autocomplete
              onPlaceSelected={(place) => {
                this.handleLocation(place.formatted_address);
              }}
              types={['address']}
              componentRestrictions={{'country': 'SG'}}>
            </Autocomplete>

            <form onSubmit={this.handleSubmit}>
              <div className="input-field">
                <textarea id='summary' defaultValue={this.state.summary} className="materialize-textarea flow-text black-text" onChange={this.handleChange}></textarea>
                <label for='summary'> Summary </label>
              </div>
            </form>

            <Row>
              <Col s={6}>
                <Input  type='select' label="Category" defaultValue='1' onChange={this.handleCategoryChange}>
                  <option value="0">Display All</option>
                  <option disabled='disabled'>Strength/Fitness</option>
                  <option value="1">Fitness/Weight Loss</option>
                  <option value="2">Gym Training</option>
                  <option disabled='disabled'>Sports</option>
                  <option value="3">Badminton</option>
                  <option value="4">Golf</option>
                  <option value="5">MMA/Martial Arts</option>
                  <option value="6">Swimming</option>
                  <option value="7">Tabletennis</option>
                  <option value="8">Tennis</option>
                  <option value="9">Yoga</option>
                  <option value="10">Other</option>
              	</Input>
              </Col>
              <Col s={6}>
                <form onSubmit={this.handleSubmit}>
                  <Input label='Price per Hour' defaultValue={this.state.price} className="flow-text yellow-text text-darken-4" onChange={this.handlePrice} />
                </form>
              </Col>
            </Row>
          </div>
            <p className='red-text'>
              {this.state.warning}
            </p>
        </CardPanel>
        </div>  :
        (this.props.uid === uid ?
          (this.state.listingNumber < 3 ?
            <Button waves='light' onClick={this.setAddFlag}>
              Add New Listing
            </Button>
            :
            <Button waves='light' disabled>
              Maximum Listings Reached!
            </Button>
          )
        :
        "")}
        {userListings}
      </div>
    );
  }
};
