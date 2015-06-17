/**
 *
 *
 */

import React from 'react';
import { Link } from 'react-router';

export default class ArrowSvg extends React.Component {

  static defaultProps = {
      transformSvg: '""'
  }

  constructor(props){
    super(props);
  }

  render() {
    const svgTag ='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="tiny" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve"><g><polygon class="poly" transform='+ this.props.transformSvg +' fill-rule="evenodd" fill="#000000" points="34.865 9 75 49.136 35.861 88.274 25.996 78.408 55.271 49.136 25 18.866 "/></g></svg>';
    return (
      <span className="wrap-svg arrow-svg" dangerouslySetInnerHTML={{__html: svgTag}}></span>
    );
  }
};
