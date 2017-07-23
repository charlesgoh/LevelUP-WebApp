import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from "firebase";
import styles from './GlobalStyles.css';
import { CardPanel, Row, Col, Button, Icon } from 'react-materialize';

export default class ListingInstance extends Component {
  render() {
    var user = firebase.auth().currentUser;
    var uid = (user ? user.uid : "");
    return (
      <div className = "card-panel z-depth-1 hoverable">
        <div className = "container">
          {/* BUTTON GOES HERE */}
          <Row>
            <Col s={3} className = 'left-align'>
              <br />
              <h6 className = 'flow-text grey-text text-lighten'>
                PRICE
              </h6>

              <h5 className = 'flow-text yellow-text text-darken-4 overflow-control'>
                SG${this.props.price}
              </h5>

              <h6 className = 'flow-text grey-text text-lighten'>
                PER HOUR
              </h6>
            </Col>

            <Col s={6}>
              <h2 className = 'flow-text red-text text-darken-4 overflow-control'>
                {this.props.title}
              </h2>

              <h6 className = 'flow-text left-align grey-text text-lighten-2 overflow-control'>
                {this.props.location}
              </h6>

              <h6 className = 'flow-text text-justify overflow-control'>
                {this.props.summary}
              </h6>
            </Col>

            <Col s={3} className='center-align'>
              <Link to={{
                pathname: "/profile/id?=" + this.props.uid
              }}>
                <Button waves='light'>
                  Profile
                  <Icon className="right">send</Icon>
                </Button>
              </Link>

              <br/>
              <br/>

              {uid === this.props.uid ? "" :
              <Link to={{
                pathname: "/message/id?=" + this.props.uid
              }}>
              <Button waves='light' className='red darken-4'>
                Chat
                <Icon className="right">email</Icon>
              </Button>
              </Link>
              }
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
