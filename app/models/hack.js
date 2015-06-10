var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    extend = require('mongoose-schema-extend'),
    PostBaseSchema = require('./post_base').Schema;

var HackSchema = PostBaseSchema.extend({
  recipes: [{
    type: Schema.ObjectId,
    ref: "recipes"
  }]
});

var Hack = mongoose.model('Hack', HackSchema);

module.exports.Hack = Hack;
module.exports.Schema = HackSchema;