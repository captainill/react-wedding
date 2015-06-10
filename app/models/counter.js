var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId; //not needed here, but may be needed in another model file
    

var CounterSchema = new Schema({
    _id: { type: String },
    seq: { type: Number }
});

/*CounterSchema.statics.findAndModify = function (query, sort, doc, options, callback) {
  return this.collection.findAndModify(query, sort, doc, options, callback);
};*/

var Counter = mongoose.model('counters', CounterSchema); //name of collection is 'photos'

module.exports.Counter = Counter;
module.exports.Schema = CounterSchema;