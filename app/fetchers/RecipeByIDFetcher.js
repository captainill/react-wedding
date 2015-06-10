/**
 * RecipesFetcher.js
 * reads all recipes right now
 */
'use strict';

var Recipe = require('../models/recipe').Recipe,
    debug = require('debug'),
    bootstrapDebug = debug('Fetcher');

module.exports = {
    name: 'RecipeByIDFetcher',
    //At least one of the CRUD methods is required
    read: function(req, resource, params, config, callback) {

        Recipe.find({recipe_id: params.inc_id})
        .populate('categories')
        .populate('author')
        .exec(function(err, result) {
            if (!err) {
                console.log('recipe find result', result);
                callback(null, result);
            } else {
                // error handling
                callback(err);
                console.log('mongo error');
            };
        });
        
    },

    create: function(req, resource, params, body, config, callback) {
        _messages.push({
            id: params.id,
            threadID: params.threadID,
            threadName: params.threadName,
            authorName: params.authorName,
            text: params.text,
            timestamp: params.timestamp
        });
        setTimeout(function () {
            callback(null, _messages);
        }, 10);
    }
    //update: function(resource, params, body, config, callback) {},
    //del: function(resource, params, config, callback) {}

};
