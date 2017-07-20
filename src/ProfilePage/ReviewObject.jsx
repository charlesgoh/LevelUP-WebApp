import React, { Component } from 'react';

export default class ReviewObject2 extends Component {

  render () {
    return (
      <div className="container center-align">
        <div className='row'>
          <div className='col s3 left-align'>
            <img src={this.props.photoURL} alt="" className='responsive-img circle'/>
            <h4 className="center-align">
              {this.props.name}
            </h4>

            {/* replace with star rating */}
            <h5 className="center-align">
              {this.props.score}
            </h5>
          </div>
          <div className='col s9 center-align'>
            <h3 className="left-align">
              {this.props.title}
            </h3>
            <h5 className="left-align">
              {this.props.feedback}
            </h5>
          </div>
        </div>
      </div>
    );
  }
}
