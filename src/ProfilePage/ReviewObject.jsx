import React, { Component } from 'react';
import { CardPanel, Row, Col } from 'react-materialize';

export default class ReviewObject extends Component {

  render () {
    return (
      <CardPanel className="center-align">
        <Row className='row'>
          <Col s={3} className='left-align'>
            <img src={this.props.photoURL} alt="" className='responsive-img circle'/>
            <h4 className="flow-text center-align">
              {this.props.name}
            </h4>

            {/* replace with star rating */}
            <h5 className="flow-text center-align">
              {this.props.score}
            </h5>
          </Col>
          <Col s={9} className='center-align'>
            <h3 className="flow-text left-align">
              {this.props.title}
            </h3>
            <h5 className="flow-text left-align">
              {this.props.feedback}
            </h5>
          </Col>
        </Row>
      </CardPanel>
    );
  }
}
