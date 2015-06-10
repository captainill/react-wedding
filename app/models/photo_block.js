var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    extend = require('mongoose-schema-extend'),
    ContentBlockSchema = require('./content_block').Schema;

var PhotoBlockSchema = ContentBlockSchema.extend({
  title: { type: String },
  photos: [{
    type: Schema.ObjectId,
    ref: "photos"
  }],
  photo_grid_type: { type: String } //this will be if it's a photo grid and we've got different layouts
});

var PhotoBlock = mongoose.model('PhotoBlock', PhotoBlockSchema);

module.exports.PhotoBlock = PhotoBlock;
module.exports.Schema = PhotoBlockSchema;