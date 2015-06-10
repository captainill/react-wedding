/**
 * 
 * 
 */
 
'use strict';
import Fluxible from 'fluxible';
import fetchrPlugin from "fluxible-plugin-fetchr";

var app = new Fluxible({
    component: require('./components/Routes.jsx')
});

app.plug(fetchrPlugin({
  xhrPath: "/api"
}));

app.getPlugin('FetchrPlugin').registerService(require("./services/recipe"));

app.registerStore(require('./stores/ApplicationStore'));
app.registerStore(require('./stores/TimeStore'));
app.registerStore(require('./stores/RecipeStore'));
app.registerStore(require('./stores/CategoriesStore'));

module.exports = app;