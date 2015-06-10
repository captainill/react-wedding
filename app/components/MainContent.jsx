/**
 *
 *
 */

import React, { PropTypes } from 'react';
import DocumentTitle from "react-document-title";
import Debug from 'debug';

const debug = Debug('-------  Debug:');

export default class MainContent extends React.Component{

  static propTypes = {
    // Injected by React Router:
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }

  constructor(props, router){
    super(props);
    console.log('MainContent: ', this.props.params, router);
  }

  //&#9829
  render() {
    return (
      <DocumentTitle title="Erica Taylor">
      	<div>
        	<p>MainContent</p>
        </div>
      </DocumentTitle>
    );
  }

}
