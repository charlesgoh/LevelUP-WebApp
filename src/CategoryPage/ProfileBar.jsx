import React, { Component }from 'react';

export default class ProfileBar extends Component {
  render() {
    return (
      <div className = 'container center-align grey lighten-2'>
        <div className = 'row valign-wrapper'>
          <div className = 'col s2'>
            <i className = 'small material-icons'>
              info_outline
            </i>
          </div>

          <div className = 'col s7 left-align'>
            <p className = 'flow-text grey-text'>
              Name
            </p>

            <p className = 'flow-text'>
              <a href = '#' className = 'red-text text-darken-4'>
                Profile
              </a>
            </p>
          </div>

          <div className = 'col s3 grey-text center-align'>
            <img src="./images/Logout.png" className = 'responsive-image' />
            <p className = 'flow-text grey-text'>
              LOG OUT
            </p>
          </div>

        </div>
      </div>
    );
  }
};
