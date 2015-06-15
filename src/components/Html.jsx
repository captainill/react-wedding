/**
 *
 *
 */

import React from 'react';
import DocumentTitle from "react-document-title";
import Debug from 'debug';

const debug = Debug('-------  SaladHacker');

/**
 * React class to handle the rendering of the HTML head section
 *
 * @class Head
 * @constructor
 */
var Html = React.createClass({

  render: function() {

    var hotServer = '';
    if(process.env.NODE_ENV !== 'production'){
      hotServer = <script src={"http://0.0.0.0:" +this.props.webpackPort +"/webpack-dev-server.js"}></script>
    }

    return (
      <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
        <title>{ DocumentTitle.rewind() }</title>
        <link href='http://fonts.googleapis.com/css?family=Gentium+Book+Basic:400,400italic,700,700italic|Open+Sans:400,700' rel='stylesheet' type='text/css'/>
        <link href='http://fonts.googleapis.com/css?family=Vollkorn:400italic,700italic,400,700' rel='stylesheet' type='text/css'/>
        <link rel="stylesheet" href={this.props.bundlePath + "/style.css"} />
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
      </body>
      <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
      { hotServer }
      <script src={this.props.bundlePath + "/client.js"} defer></script>
      </html>
    );
  }
});

module.exports = Html;
