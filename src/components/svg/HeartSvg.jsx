/**
 *
 *
 */

import React from 'react';
import { Link } from 'react-router';

export default class HeartSvg extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    const svgTag ='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="32px" height="63.516px" viewBox="0 0 71.914 63.516" enable-background="new 0 0 71.914 63.516" xml:space="preserve"><path class="poly" d="M52.539 0c-7.047 0-13.047 1.875-16.586 7.395C32.414 1.875 26.067 0 19.024 0 8.031 0 0 8.914 0 19.907c0 14.226 30.727 39.355 35.785 43.609 8.629-7.605 36.129-28.785 36.129-43.609C71.91 8.914 63.535 0 52.539 0z"/></svg>';
    return (
      <span className="wrap-svg heart-logo" dangerouslySetInnerHTML={{__html: svgTag}}></span>
    );
  }
};
