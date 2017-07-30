import React, { Component } from 'react';
import firebase from 'firebase';
import Autocomplete from 'react-google-autocomplete';
import { Modal, Button, CardPanel, Row, Col, Input } from 'react-materialize';
import styles from '../GlobalStyles.css';

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
      warning: "",
      category: "1",
      id: "1"
    };

    this.setEditFlag = this.setEditFlag.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSummaryChange = this.handleSummaryChange.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
    this.handleListingRemoval = this.handleListingRemoval.bind(this);

    this.handleCategoryFit = this.handleCategoryFit.bind(this);
    this.handleCategorySport = this.handleCategorySport.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

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
      if(parseInt(this.state.price, 10) <= 0){
        this.setState({warning: "Please input positive numbers only."});
        return;
      }
    }

    this.setState({
      editable: !this.state.editable,
      warning: ""
    });

    if (this.state.editable){
      var user = firebase.auth().currentUser;
      firebase.database().ref('listings/' + user.uid + '/' + this.state.id).update({
        summary: this.state.summary,
        title: this.state.title,
        price: this.state.price,
        location: this.state.location,
        category: this.state.category
      });
    }
  }

  handleListingRemoval() {
    this.setState({
      editable: false
    });
    this.props.callback(this.state.id);
  }

  componentWillMount() {
    let user = firebase.auth().currentUser;
    if (user) {
      this.setState({ loggedIn: true })
    };
  }

  componentDidMount() {
    this.setState({
      summary: this.props.summary,
      title: this.props.title,
      price: this.props.price,
      location: this.props.location,
      id: this.props.id,
      category: this.props.category
    });
  }

  handlePrice(event) {
    this.setState({price: event.target.value});
  }

  handleSummaryChange(event) {
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
                <h5 className = 'flow-text yellow-text text-darken-4 overflow-control'>
                  SG${this.state.price}
                </h5> :
                <form onSubmit={this.handleSubmit}>
                  <Input defaultValue={this.state.price} className="flow-text yellow-text text-darken-4" onChange={this.handlePrice} />
                </form>
              }

              <h6 className = 'flow-text grey-text text-lighten'>
                PER HOUR
              </h6>

              {this.state.editable ?
                <div>
                  <form onSubmit={this.handleSubmit}>
                		<Input name='group1' className='with-gap' type='radio' value='1' label='Fitness' onClick={this.handleCategoryFit}/>
                		<Input name='group1' className='with-gap' type='radio' value='2' label='Sports' onClick={this.handleCategorySport}/>
                  </form>
                </div> :
              ""}
            </Col>

            <Col s={8}>
              {!this.state.editable ?
                <h2 className = 'flow-text red-text text-darken-4'>
                {this.state.title}
                </h2>
                :
                <form onSubmit={this.handleSubmit}>
                  <div className="input-field">
                    <textarea defaultValue={this.state.title} className="materialize-textarea flow-text red-text text-darken-4" onChange={this.handleTitleChange}></textarea>
                  </div>
                </form>
              }

              {!this.state.editable?
                <h6 className = 'flow-text left-align grey-text overflow-control'>
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
                <h4 className = 'flow-text text-justify overflow-control'>
                  {this.state.summary}
                </h4>
                :
                <form onSubmit={this.handleSubmit}>
                  <div className="input-field">
                    <textarea defaultValue= {this.state.summary} className="materialize-textarea flow-text black-text" onChange={this.handleSummaryChange}></textarea>
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
