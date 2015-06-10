var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
var TagSchema = new Schema({
    name: {type: String, "default": ''},
    description: {type: String, "default": ''},
});

var Tag = mongoose.model('tags', TagSchema);

module.exports.Tag = Tag;
module.exports.Schema = TagSchema;