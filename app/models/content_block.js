/*
* Base schema for Blocks (Text, Photo, PhotoGroup)
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ContentBlockSchema = new Schema({
},{
  collection: 'blocks',
  discriminatorKey : '_type'
});

module.exports.Schema = ContentBlockSchema;