var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId; //not needed here, but may be needed in another model file
    

CategorySchema = new Schema({
    name: {type: String, "default": ''},
    description: {type: String, "default": ''},
});

var Category = mongoose.model('categories', CategorySchema); //name of collection is 'categories'

module.exports.Category = Category;
module.exports.Schema = CategorySchema;