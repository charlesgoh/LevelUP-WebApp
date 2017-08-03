import React, { Component } from 'react';
import { CardPanel, Row, Col } from 'react-materialize';
import styles from '../GlobalStyles.css';
import Rating from 'react-rating-system';

export default class ReviewObject extends Component {

  render () {
    return (
      <CardPanel className="center-align">
        <Row className='row'>
          <Col s={3} className='left-align'>
            <img src={this.props.photoURL} alt="" className='responsive-img circle'/>
            <h4 className="flow-text center-align overflow-control">
              {this.props.name}
            </h4>

            <Rating image={require('./star2.png')} fillBG="#f1c40f" containerStyle={{ maxWidth: '200px' }} editable={false} lockRating={true} initialValue={this.props.score}/>

          </Col>
          <Col s={9} className='center-align'>
            <h3 className="flow-text left-align overflow-control">
              {this.props.title}
            </h3>
            <h5 className="flow-text left-align overflow-control">
              {this.props.feedback}
            </h5>
          </Col>
        </Row>
      </CardPanel>
    );
  }
}
