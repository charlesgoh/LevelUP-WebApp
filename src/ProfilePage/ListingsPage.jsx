import React, { Component } from 'react';
import firebase from 'firebase';
import Listing from './Listing.jsx';
import Autocomplete from 'react-google-autocomplete';
import { Modal, Button, CardPanel, Row, Col, Input } from 'react-materialize';
import styles from '../GlobalStyles.css';

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
      validListing: false
    };

    this.submitNewListing = this.submitNewListing.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleCategoryFit = this.handleCategoryFit.bind(this);
    this.handleCategorySport = this.handleCategorySport.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
    this.callUpdate = this.callUpdate.bind(this);
    this.resetListing = this.resetListing.bind(this);
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
      validListing: true
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

  resetListing(){
    if (this.state.validListing){
      this.setState({
        summary: "",
        title: "",
        price: "",
        location: "",
        category: "1",
        validListing: false
      })
    }
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
      var uid = this.props.uid;

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
    console.log(id);
    var user = firebase.auth().currentUser;
    firebase.database().ref('listings/' + user.uid + '/' + id).remove();
    var listingsRef = firebase.database().ref('/listings');


    listingsRef.on("value", snapshot => {
      var data = snapshot.val()[this.props.uid];
      var uid = this.props.uid;
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

  handleCategoryFit(event) {
    this.setState({category: "1"});
  }

  handleCategorySport(event) {
    this.setState({category: "2"});
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render () {
    var uid = (firebase.auth().currentUser ? firebase.auth().currentUser.uid : "");
    var userListings = '';
    var isValidListing = this.state.validListing;
    var numListings = this.state.listingNumber;

    var clickable = {
      cursor: "pointer"
    };

    if(this.state.listings){
      userListings = this.state.listings.map(item =>
        <Listing key={item.id} id={item.id} uid={this.props.uid} title={item.title} summary={item.summary} category={item.category} price={item.price} location={item.location} callback={this.callUpdate}/>
      );
    }

    return (
      <div>
        <br />
        {uid !== this.props.uid ? "" :
          <Modal
            header='Add New Listing'
            trigger={
              <Button waves='light'>
                Add
              </Button>
            }
            actions={
              <div>
               <Button modal="close" waves='light' onClick={this.resetListing}>Cancel</Button>
               {isValidListing || numListings >= 3 ? "" : <Button waves='light' type='submit' onClick={this.submitNewListing}>Submit</Button>}
               <p className='red-text'>
                 {this.state.warning}
               </p>
             </div>
            }>
            {numListings < 3 ?
              (isValidListing ?
                <p> Listing was successfully submitted! </p>
                  :
                  <div>
                    <form onSubmit={this.handleSubmit}>
                      <p>
                        Title
                      </p>
                      <Input defaultValue={this.state.price} className="flow-text" onChange={this.handleTitleChange} />

                      <p>
                        Summary
                      </p>
                      <Input defaultValue={this.state.price} className="flow-text" onChange={this.handleChange} />
                    </form>

                      <p>
                        Location
                      </p>
                      <div>
                        <Autocomplete
                          onPlaceSelected={(place) => {
                            // console.log(place.formatted_address);
                            this.handleLocation(place.formatted_address);
                          }}
                          types={['address']}
                          componentRestrictions={{'country': 'SG'}}>
                        </Autocomplete>
                      </div>
                    <form onSubmit={this.handleSubmit}>
                      <Row>
                        <Col s={6}>
                          <p>
                            Price/Hour
                          </p>
                          <Input defaultValue={this.state.price} className="flow-text" onChange={this.handlePrice} />
                        </Col>
                        <Col s={6}>
                          <Input name='group1' className='with-gap' type='radio' value='1' label='Fitness' onClick={this.handleCategoryFit} defaultValue='selected' />
                          <Input name='group1' className='with-gap' type='radio' value='2' label='Sports' onClick={this.handleCategorySport}/>
                        </Col>
                      </Row>
                    </form>
                  </div>)
                :
                <p>
                  You have reached the maximum number of listings.
                </p>}
            </Modal>}
        {userListings}
      </div>
    );
  }
};
