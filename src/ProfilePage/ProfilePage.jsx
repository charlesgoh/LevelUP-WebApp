import React, { Component } from 'react';
import UserProfile from './UserProfile';
import ListingsPage from './ListingsPage.jsx';
import ReviewPage from './ReviewPage';
import { Modal, Button, CardPanel, Row, Col, Tabs, Tab } from 'react-materialize';

export default class ProfilePage extends Component {
  render (){
    let uidProp = window.location.search.slice(2);

    return (
      <div>
        <Tabs className='tab-demo z-depth-1'>
          <Tab title="About Me" active>
            <UserProfile uid={uidProp} />
          </Tab>
          <Tab title="Listings">
            <ListingsPage uid={uidProp} />
          </Tab>
          <Tab title="Reviews">
            <ReviewPage uid={uidProp} />
          </Tab>
        </Tabs>
      </div>
    );
  }
};
