var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId; //not needed here, but may be needed in another model file
    

var PhotoSchema = new Schema({
    asset_url: {type: String},
    author: [{
      type: Schema.ObjectId,
      ref: "users"
    }],
    caption: {type: String},
    height: {type: String},
    width: {type: String},
    position: {type: Number}   
});

var Photo = mongoose.model('photos', PhotoSchema); //name of collection is 'photos'

module.exports.Photo = Photo;
module.exports.Schema = PhotoSchema;