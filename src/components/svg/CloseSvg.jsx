/**
 *
 *
 */

import React from 'react';

export default class ArrowSvg extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    const svgTag ='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><polygon class="poly" fill="#000000" points="87.316,75.934 61.387,50 87.316,24.068 75.934,12.685 50.003,38.616 24.072,12.685 12.689,24.068   38.621,50 12.684,75.934 24.066,87.316 50.003,61.381 75.934,87.316 "></polygon></svg>';
    return (
      <span className="wrap-svg close-svg" dangerouslySetInnerHTML={{__html: svgTag}}></span>
    );
  }
};
