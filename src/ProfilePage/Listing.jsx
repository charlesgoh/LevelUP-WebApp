import React, { Component } from 'react';
import firebase from 'firebase';

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
    };

    this.setEditFlag = this.setEditFlag.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
  };

  setEditFlag() {
    this.setState({
      editable: !this.state.editable
    });

    if (this.state.editable){
      var user = firebase.auth().currentUser;
      firebase.database().ref('listings/' + user.uid).update({
        summary: this.state.summary,
        title: this.state.title,
        price: this.state.price,
        location: this.state.location
      });
      console.log("Pushed data into database.");
    }
  }

  componentWillMount() {
    let user = firebase.auth().currentUser;
    if (user) {
      this.setState({ loggedIn: true })
    };
    console.log(JSON.stringify(this.state));
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
      } else {
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

  handleLocation(event) {
    this.setState({location: event.target.value});
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render () {
    var user = firebase.auth().currentUser;

    var clickable = {
      cursor: "pointer"
    };

    return (
      <div className = "card-panel z-depth-1">
        <div className = "container">
          {user ?
            <div className = 'right-align flow-text'>
             <a className="grey-text" onClick={this.setEditFlag} type="submit" style={clickable}>
               {this.state.editable ? "Update" : "Edit"}
             </a>
           </div> : ""}
          <div className = 'row'>
            <div className = 'col s4 left-align'>
              <br />
              <h6 className = 'flow-text grey-text text-lighten'>
                PRICE
              </h6>

              {!this.state.editable ?
                <h5 className = 'flow-text yellow-text text-darken-4'>
                  SG${this.state.price}
                </h5> :
                <form onSubmit={this.handleSubmit}>
                  <div className = "input-field">
                    <input defaultValue={this.state.price} className="materialize-textarea flow-text yellow-text text-darken-4" onChange={this.handlePrice}></input>
                  </div>
                </form>
              }

              <h6 className = 'flow-text grey-text text-lighten'>
                PER HOUR
              </h6>
            </div>

            <div className = 'col s8'>
              {!this.state.editable ? <h2 className = 'flow-text red-text text-darken-4'>
                {this.state.title}
              </h2>:
              <form onSubmit={this.handleSubmit}>
                <div className = "input-field">
                  <input defaultValue= {this.state.title} type="text" className="materialize-textarea flow-text red-text text-darken-4" onChange={this.handleTitleChange}></input>
                </div>
              </form>
              }

              {!this.state.editable? <h6 className = 'flow-text left-align grey-text text-lighten-2'>
                {this.state.location}
              </h6> :
              <form onSubmit={this.handleSubmit}>
                <div className = "input-field">
                  <textarea defaultValue= {this.state.location} type="text" className="validate" onChange={this.handleLocation}></textarea>
                </div>
              </form>
              }

              {!this.state.editable ? <h6 className = 'flow-text text-justify'>
                {this.state.summary}
              </h6>:
              <form onSubmit={this.handleSubmit}>
                <div className = "input-field">
                  <textarea defaultValue= {this.state.summary} type="text" className="materialize-textarea" onChange={this.handleChange}></textarea>
                </div>
              </form>
              }
            </div>

          </div>
        </div>
      </div>
    );
  }
};
