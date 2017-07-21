import React, { Component }from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { Row, Col, CardPanel } from 'react-materialize';

export default class ProfileBar extends Component {

  render() {
    var user = firebase.auth().currentUser;
    return (
      <CardPanel className='z-depth-1'>
        <Row className='valign-wrapper'>
          <Col s={4}>
            <img alt="" className="circle responsive-img" src={user.photoURL} />
          </Col>

          <Col s={8} className='center-align'>
            <Link to={{
              pathname: "/profile/id?=" + user.uid,
              state: {
                uid: user.uid
              }}
            }>
              <strong className="flow-text black-text ">{user.displayName}</strong>
            </Link>
          </Col>
        </Row>
      </CardPanel>
    );
  }
};
