import React, {Component} from 'react';
import { Slider, Slide } from 'react-materialize';

export default class WelcomePage extends Component {
  render() {
    return (
      <Slider>
        <Slide src={require("./Graphics/Slider/Slider0.png")} title="No Registration Required" placement="right">
          Sign in with Google
        </Slide>
        <Slide src="https://lorempixel.com/800/400/sports/1" title="The secret of getting ahead is getting started" placement="right">
          Mark Twain
        </Slide>
        <Slide src="https://lorempixel.com/800/400/sports/2" title="The will to win, the desire to succeed, the urge to reach your full potential... these are the keys that will unlock the door to personal excellence" placement="right">
          Confucius
        </Slide>
        <Slide src="https://lorempixel.com/800/400/sports/8" title="As you think, so you shall become" placement="right">
          Bruce Lee
        </Slide>
      </Slider>
    );
  }
}
