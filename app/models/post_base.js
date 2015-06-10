/*
* Base scehma for Hacks and Recipes
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostBaseSchema = new Schema({
  inc_id: { type: Number },
  url: { type: String },
  title: {type: String, "default": ''},
  author: [{
    type: Schema.ObjectId,
    ref: "users"
  }],
  content: [{
    type: Schema.ObjectId,
    ref: "blocks"
  }],
  created_at: { type: Date },
  updated_at: { type: Date },
  tags: [{
    type: Schema.ObjectId,
    ref: "tags"
  }]
});

PostBaseSchema.pre('save', function(next) {
  this.url = this.title.split(' ').join('-') + '-' + this.inc_id.toString();
  next();
});

PostBaseSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

//PostBase = mongoose.model('PostBase', PostBaseSchema);

//module.exports.PostBase = PostBase;
module.exports.Schema = PostBaseSchema;