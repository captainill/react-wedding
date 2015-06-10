/**
 *
 *
 */
require('babel/register');

import express from 'express';
import favicon from 'serve-favicon';
import serialize from 'serialize-javascript';
import navigateAction from './app/actions/navigate' ;
import Debug from 'debug';
import React from 'react';
import Router from 'react-router';
import config from './env/config';
import mongoose from 'mongoose';
import webpack from './env/webpack-config';
import app from './app/app';
import Html from './app/components/Html';
import FluxibleComponent from 'fluxible/addons/FluxibleComponent';

const debug = Debug('-------  SaladHacker');
const HtmlComponent = React.createFactory(Html);
const fetchr = app.getPlugin("FetchrPlugin");
let schemas = require('./app/models');

// Connect to mongodb
let connect = function () {
  let options = { server: { socketOptions: { keepAlive: 1 } } };
  return mongoose.connect(process.env.MONGOLAB_URI || config.db, options);
};
let connection = connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);


// Bootstrap models
/*var UserSchema = require('./app/models/user.js').Schema;
mongoose.model('User', UserSchema);*/

function db (req, res, next) {
  req.db = {
    User: connection.model('User', schemas.UserSchema, 'users'),
    Recipe: connection.model('Recipe', schemas.RecipeSchema, 'recipes'),
    Counter: connection.model('Counter', schemas.CounterSchema, 'counter')
  };
  next();
}


let server = express();
server.use(favicon(__dirname + '/favicon.ico'));
server.use('/assets', express.static(__dirname + '/assets'));
server.use('/images', express.static(__dirname + '/assets/images'));
server.use(fetchr.getXhrPath(), fetchr.getMiddleware()); //use fetchr middleware
server.use(function (req, res, next) {
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
    }
  });

  router.run(function (Handler, state) {
    context.executeAction(navigateAction, state, function () {
      let exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';
      //let deepestRouteName = state.routes[state.routes.length - 1].name;

      let Component = React.createFactory(Handler);
      let markup = React.renderToString(React.createElement(
        FluxibleComponent,
        {context: context.getComponentContext()},
        Component()
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
