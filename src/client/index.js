/**
 *
 *
 */

if (process.env.NODE_ENV === 'development') {
  console.clear();
}

require('babel/polyfill');

import React from 'react';
import debug from 'debug';
import app from '../app';
import Router from'react-router';
import navigateAction from '../actions/navigate';
import FluxibleComponent from 'fluxible/addons/FluxibleComponent';
import '../../scss/main.scss';

window.React = React; // For chrome dev tool support

const bootstrapDebug = debug('------- ------- ------- -------  Debug');
const mountNode = document.getElementById('app');
const dehydratedState = window.__DATA__; // Sent from the server
const routes = app.getComponent();
const HistoryLocation = Router.HistoryLocation;

function RenderApp(context, Handler){
    bootstrapDebug('React Rendering');

    let FC = React.createElement(
      FluxibleComponent,
      {context: context.getComponentContext()},
      React.createElement(Handler)
    );
    React.render(FC, mountNode, function () {
      bootstrapDebug('React Rendered');
    })

    /*
    let Component = React.createFactory(Handler);
    React.render(Component(), mountNode, function () {
        bootstrapDebug('React Rendered');
    });*/
};


app.rehydrate(dehydratedState, function (err, context) {
    if (err) {
        throw err;
    }

    //bootstrapDebug('fucking context=', context);
    // For debugging
    window.context = context;

    const router = Router.create({
      routes,
      location: HistoryLocation,
      transitionContext: context,
    });

    window.context = context;

    let firstRender = true;
    router.run(function (Handler, state) {
        if (firstRender) {
            // Don't call the action on the first render on top of the server rehydration
            // Otherwise there is a race condition where the action gets executed before
            // render has been called, which can cause the checksum to fail.
            RenderApp(context, Handler);
            firstRender = false;
        } else {
            context.executeAction(navigateAction, state, function () {
                RenderApp(context, Handler);
            });
        }
    });
});
