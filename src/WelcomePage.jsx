import React, {Component} from 'react';
import * as FirebaseService from './FirebaseService';
import ListingInstance from './ListingInstance';
import { Carousel, Button } from 'react-materialize';

export default class WelcomePage extends Component {
  render() {
    return (
      <Carousel
        options={{ fullWidth: true }}
        carouselId="guide"
        fixedItem={
        <div>
          <Button id="welcomePrev" className='btn'>{"<"}</Button>
          <Button id="welcomeNext" className='btn'>{">"}</Button>
        </div>}>
        <div className='red center-align'>
          <h2>Welcome to LevelUP.today!</h2>
          <p className='white-text'>A simple guide to get you started</p>
        </div>
        <div className='amber center-align'>
          <h2>Setting up your profile</h2>
          <p className='white-text'>This is your second panel</p>
        </div>
        <div className='green center-align'>
          <h2>Making a new listing</h2>
          <p className='white-text'>This is your third panel</p>
        </div>
        <div className='blue center-align'>
          <h2>Finding the job you want</h2>
          <p className='white-text'>This is your fourth panel</p>
        </div>
        <div className='purple center-align'>
          <h2>Interacting with other users</h2>
          <p className='white-text'>This is your fifth panel</p>
        </div>
        <div className='cyan center-align'>
          <h2>Leaving feedback</h2>
          <p className='white-text'>This is your sixth panel</p>
        </div>
        <div className='pink center-align'>
          <h2>You are now ready to use LevelUP.today!</h2>
          <p className='white-text'>This is your sixth panel</p>
        </div>
      </Carousel>
    );
  }
}
