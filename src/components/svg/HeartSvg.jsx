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
    const svgTag ='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="40px" height="36px" viewBox="0 0 89.165 80.976" enable-background="new 0 0 89.165 80.976" xml:space="preserve"><g><g><path class="poly" fill="#fff" d="M6.055 41.944C2.019 37.122 0 31.626 0 25.234 0 10.655 11.777 0 26.132 0c6.842 0 12.785 3.027 17.386 7.289 0.224 0.449 0.672 0.896 1.233 1.122C50.136 3.027 55.742 0 64.376 0c13.458 0 24.788 11.663 24.788 25.234 0 6.393-2.359 11.888-6.057 16.71L49.125 78.843c-1.347 1.461-2.694 2.133-4.376 2.133-1.906 0-3.589-0.672-4.822-2.133L6.055 41.944z"/></g></g></svg>';
    return (
      <span className="heart-logo" dangerouslySetInnerHTML={{__html: svgTag}}></span>
    );
  }
};
