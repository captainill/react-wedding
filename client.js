/**
 * 
 * 
 */


require('babel/polyfill');

import React from 'react';
import debug from 'debug';
import app from './app/app';
import Router from'react-router';
import navigateAction from './app/actions/navigate';
import FluxibleComponent from 'fluxible/addons/FluxibleComponent';

import './scss/main.scss';

window.React = React; // For chrome dev tool support
debug.enable('*');
const bootstrapDebug = debug('-------  SaladHacker');


const mountNode = document.getElementById('app');
const dehydratedState = window.App; // Sent from the server

const routes = app.getComponent();
const HistoryLocation = Router.HistoryLocation;


function RenderApp(context, Handler){
    bootstrapDebug('React Rendering');

    let Component = React.createFactory(Handler);
    let FC = React.createElement(
      FluxibleComponent,
      {context: context.getComponentContext()},
      Component()
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

    console.log('fucking context=', context);

    const router = Router.create({
      routes,
      location: HistoryLocation,
      transitionContext: context.getComponentContext(),
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
