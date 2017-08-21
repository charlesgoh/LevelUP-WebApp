import React, {Component} from 'react';
import { Slider, Slide } from 'react-materialize';

export default class WelcomePage extends Component {
  render() {
    return (
      <Slider>
        <Slide src={require("./Graphics/Slider/Slider 1.png")} title="No Registration Required" placement="right">
          Sign in with Google
        </Slide>
        <Slide src={require("./Graphics/Slider/Slider 2.png")} title="The secret of getting ahead is getting started" placement="right">
          Mark Twain
        </Slide>
        <Slide src={require("./Graphics/Slider/Slider 3.png")} title="The will to win, the desire to succeed, the urge to reach your full potential... these are the keys that will unlock the door to personal excellence" placement="right">
          Confucius
        </Slide>
        <Slide src={require("./Graphics/Slider/Slider 4.png")} title="As you think, so you shall become" placement="right">
          Bruce Lee
        </Slide>
      </Slider>
    );
  }
}
