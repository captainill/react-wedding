/**
 *
 *
 */

import React from 'react';
import DocumentTitle from "react-document-title";
import BodyClass from "../utils/BodyClass";
import Debug from 'debug';
import Config from '../constants/Config';

const debug = Debug('-------  Wedding App');

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
        <meta property="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
        <meta property="keywords" content={Config.keywords} />
        <meta property="description" content={Config.siteDescription} />
        <meta property="og:title" content={Config.siteTitle} />
        <meta property="og:image" content={Config.siteImageUrl} />
        <meta property="og:site_name" content={Config.siteTitle} />
        <meta property="og:url" content={Config.siteUrl} />
        <meta property="og:description" content={Config.siteDescription} />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:site" content={Config.siteUrl} />
        <meta property="twitter:creator" content={Config.creatorTwitter} />
        <meta property="twitter:title" content={Config.siteTitle} />
        <meta property="twitter:description" content={Config.siteDescription} />
        <meta property="twitter:image" content={Config.siteImageUrl} />
        <meta property="twitter:url" content={Config.site} />
        <title>{ DocumentTitle.rewind() }</title>
        <link href='http://fonts.googleapis.com/css?family=Vollkorn:400italic,700italic,400,700' rel='stylesheet' type='text/css'/>
        <link rel="stylesheet" href={this.props.bundlePath + "/style.css"} />
      </head>
      <body className={BodyClass.rewind()}>
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
