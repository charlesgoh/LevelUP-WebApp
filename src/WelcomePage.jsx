import React, {Component} from 'react';
import { Slider, Slide } from 'react-materialize';

export default class WelcomePage extends Component {
  render() {
    return (
      <Slider>
        <Slide src="https://farm5.staticflickr.com/4436/35871686044_70c4e90578_b.jpg"
        title="No Registration Required"
        placement="right">
          Sign in with Google
        </Slide>
        <Slide src="https://farm5.staticflickr.com/4337/36311327310_4d297ea379_b.jpg"
        title="The secret of getting ahead is getting started"
        placement="right">
          Mark Twain
        </Slide>
        <Slide src="https://farm5.staticflickr.com/4358/36311327000_c9040dc97f_b.jpg"
        title="Physical fitness is not only one of the most important keys to a healthy body, it is the basis of dynamic and creative intellectual activity"
        placement="right">
          John F. Kennedy
        </Slide>
        <Slide src="https://farm5.staticflickr.com/4370/36706542465_8aa13a24e6_b.jpg"
        title="As you think, so you shall become"
        placement="right">
          Bruce Lee
        </Slide>
      </Slider>
    );
  }
}
