import React, { Component } from 'react';
import firebase from 'firebase';
import Autocomplete from 'react-google-autocomplete';
import { Modal, Button, CardPanel, Row, Col, Input } from 'react-materialize';

export default class Listing extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      editable: false,
      summary: "",
      title: "",
      price: "",
      location: "",
      warning: ""
    };

    this.setEditFlag = this.setEditFlag.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleListingRemoval = this.handleListingRemoval.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
  };

  setEditFlag() {
    if(this.state.editable){
      if(isNaN(this.state.price) || !isFinite(this.state.price)){
        this.setState({warning: "Please fill in numbers only for prices!"});
        return;
      }
      if(!this.state.summary || !this.state.title || !this.state.price){
        this.setState({warning: "Please fill in all fields."});
        return;
      }
    }

    this.setState({
      editable: !this.state.editable,
      warning: ""
    });

    if (this.state.editable){
      var user = firebase.auth().currentUser;
      firebase.database().ref('listings/' + user.uid).update({
        summary: this.state.summary,
        title: this.state.title,
        price: this.state.price,
        location: this.state.location
      });
    }
  }

  handleListingRemoval() {
    this.setState({
      editable: false
    });

    var user = firebase.auth().currentUser;
    firebase.database().ref('listings/' + user.uid).remove();
  }

  componentWillMount() {
    let user = firebase.auth().currentUser;
    if (user) {
      this.setState({ loggedIn: true })
    };
  }

  componentDidMount() {
    firebase.database().ref().on("value", snapshot => {
      var thisUser = snapshot.val();
      var uid = this.props.uid;

      if (!thisUser["listings"] || !thisUser["listings"][uid]) {
        console.log("No entries. First write to db");

        this.setState({
          summary: "Listing Summary",
          title: "Title of Listing",
          price: "0",
          location: "Your preferred location"
        });
      }
      else {
        this.setState({
          summary: thisUser["listings"][uid]["summary"],
          title: thisUser["listings"][uid]["title"],
          price: thisUser["listings"][uid]["price"],
          location: thisUser["listings"][uid]["location"]
        });
      }
    });
  }

  handlePrice(event) {
    console.log("Price handled");
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

  handleSubmit(event) {
    event.preventDefault();
  }

  render () {
    var uid = (firebase.auth().currentUser ? firebase.auth().currentUser.uid : "");

    var clickable = {
      cursor: "pointer"
    };

    return (
      <CardPanel className="z-depth-1">
        <div className = "container">
          {uid === this.props.uid ?
            <div className = 'right-align flow-text'>
             <a className="grey-text" onClick={this.setEditFlag} type="submit" style={clickable}>
               {this.state.editable ? "Update" : "Edit"}
             </a>
             <br />
             {this.state.editable ?
               <Modal
                 header={"Delete listing?"}
                 trigger={<a className="grey-text" style={clickable}>Delete</a>}
                 actions={
                   <div>
                    <Button modal="close" waves='light' onClick={this.handleListingRemoval}>Delete Listing</Button>
                    <Button modal="close" waves='light'>Close</Button>
                  </div>
                 }>
                 <p> Do you really wish to delete this listing? This action is irreversible!</p>
               </Modal>
               :
               ""}
            </div> : ""}
          <Row>
            <Col s={4} className ='left-align'>
              <br />
              <h6 className = 'flow-text grey-text text-lighten'>
                PRICE
              </h6>

              {!this.state.editable ?
                <h5 className = 'flow-text yellow-text text-darken-4'>
                  SG${this.state.price}
                </h5> :
                <form onSubmit={this.handleSubmit}>
                  <Input defaultValue={this.state.price} className="flow-text yellow-text text-darken-4" onChange={this.handlePrice} />
                </form>
              }

              <h6 className = 'flow-text grey-text text-lighten'>
                PER HOUR
              </h6>
            </Col>

            <Col s={8}>
              {!this.state.editable ?
                <h2 className = 'flow-text red-text text-darken-4'>
                {this.state.title}
                </h2>
                :
                <form onSubmit={this.handleSubmit}>
                  <div class="input-field">
                    <textarea defaultValue={this.state.title} className="materialize-textarea flow-text red-text text-darken-4" onChange={this.handleTitleChange}></textarea>
                  </div>
                </form>
              }

              {!this.state.editable?
                <h6 className = 'flow-text left-align grey-text'>
                  {this.state.location}
                </h6>
                :
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
              }

              {!this.state.editable ?
                <h4 className = 'flow-text text-justify'>
                  {this.state.summary}
                </h4>
                :
                <form onSubmit={this.handleSubmit}>
                  <div class="input-field">
                    <textarea defaultValue= {this.state.summary} className="materialize-textarea flow-text black-text" onChange={this.handleChange}></textarea>
                  </div>
                </form>
              }
            </Col>
          </Row>
          {this.state.editable ?
            <p className="red-text text-darken-1 right-align">
              {this.state.warning}
            </p>
            :
            ""
          }
        </div>
      </CardPanel>
    );
  }
};
