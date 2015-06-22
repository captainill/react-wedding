/**
 *
 *
 */
require('babel/register');

import path from 'path';
import url from 'url';
import express from 'express';
import favicon from 'serve-favicon';
import serialize from 'serialize-javascript';
import navigateAction from '../actions/navigate' ;
import Debug from 'debug';
import React from 'react';
import Router from 'react-router';
import config from '../../env/config';
import webpack from '../../env/webpack-config';
import app from '../app';
import Html from '../components/Html';
import FluxibleComponent from 'fluxible/addons/FluxibleComponent';

const debug = Debug('-------  SaladHacker');
const HtmlComponent = React.createFactory(Html);

let fetchrPlugin = app.getPlugin('FetchrPlugin');
fetchrPlugin.registerService(require('../services/photo'));

let server = express();
server.use(favicon(path.join(__dirname, '..', '..', '/favicon.ico')));
server.use('/assets', express.static(path.join(__dirname, '..', '..', '/assets')));
server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware()); //use fetchr middleware
server.use(function (req, res, next) {

  //app is not using query params on server so we remove them if a url
  //comes to the server with them
  if(Object.keys(req.query).length !== 0){
    const path = url.parse(req.url).pathname;
    return res.redirect(path);
  }

  let context = app.createContext();
  let routes = app.getComponent();
  let location = req.path;

  let router = Router.create({
    routes,
    location,
    transitionContext: context.getComponentContext(),
    onAbort: (abortReason) => { //https://github.com/rackt/react-router/issues/612#issuecomment-77179261
      let {to, params, query} = abortReason;
      let url = router.makePath(to, params, query);
      res.redirect(url);
    },
    onError: function(err) {
      debug('Routing Error', err);
      cb(err);
    }
  });

  router.run(function (Handler, state) {
    context.executeAction(navigateAction, state, function () {
      let exposed = 'window.__DATA__=' + serialize(app.dehydrate(context)) + ';';
      //let deepestRouteName = state.routes[state.routes.length - 1].name;

      let markup = React.renderToString(React.createElement(
        FluxibleComponent,
        {context: context.getComponentContext()},
        React.createElement(Handler)
      ));

      let html = React.renderToStaticMarkup(HtmlComponent({
        webpackPort: config.webpack.dev.port,
        bundlePath: webpack.output.publicPath,
        state: exposed,
        markup: markup //React.renderToString(<Handler context={context.getComponentContext()}/>)
      }));

      res.send(html);
    });
  });
});


const port = process.env.PORT || config.http.port;
server.listen(port);
console.log('Listening on port ' + port);
