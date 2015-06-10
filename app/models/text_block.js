var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    extend = require('mongoose-schema-extend'),
    ContentBlockSchema = require('./content_block').Schema;

var TextBlockSchema = ContentBlockSchema.extend({
  content: { type: String }
});

var TextBlock = mongoose.model('TextBlock', TextBlockSchema);

module.exports.TextBlock = TextBlock;
module.exports.Schema = TextBlockSchema;