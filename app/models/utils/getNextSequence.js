var Counter = require('../counter').Counter;

exports.getNextSequence = function(name, callback) {
  Counter.findOneAndUpdate({ _id: name }, { $inc: { seq: 1 } }, { new: true }, function(err, counter){
      //console.log('---getNextSequence counter.seq', counter.seq);
      if(callback){
        callback(null, counter.seq);
      }else{
        return counter.seq;
      }
    }
  )
}