import React from 'react';
import { Route, NotFoundRoute, Redirect } from 'react-router';
import Application from './Application.jsx';
import MainContent from './MainContent.jsx';
import Photo from './Photo.jsx';
import NotFound from './NotFound.jsx';

var routes = (
  <Route name="app" path="/" handler={Application}>
    <Route name="main" path="/" handler={MainContent}/>
    <Route name="photo" path="/photo/:id" handler={MainContent}/>
    <NotFoundRoute name="not-found" handler={NotFound}/>
  </Route>
);

module.exports = routes;
