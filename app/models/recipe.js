var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    extend = require('mongoose-schema-extend'),
    PostBaseSchema = require('./post_base').Schema;

var RecipeSchema = PostBaseSchema.extend({
  //department : String
});

var Recipe = mongoose.model('Recipe', RecipeSchema); //name of collection is 'recipes'

module.exports.Recipe = Recipe;
module.exports.Schema = RecipeSchema;