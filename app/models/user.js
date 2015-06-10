var mongoose = require('mongoose'),
    findOrCreate = require('mongoose-findorcreate'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId; //not needed here, but may be needed in another model file
    

var UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  displayName: {
    type: String,
    required: true,
    trim: true
  },
  password: String,
  email: {
    type: String,
    required: true,
    trim: true
  },
  approved: {
    type: Boolean,
    default: false
  },
  banned: {
    type: Boolean,
    default: false
  },
  admin: {
    type: Boolean,
    default: false
  },
  headline: String,
  photoUrl: String,
  created: {
    type: Date,
    default: Date.now
  },
  updated:  {
    type: Date, default: Date.now
  },
  twitterUrl: String,
  facebookUrl: String,
  own: Boolean,
  posts: {
    own: [Schema.Types.Mixed],
    likes: [Schema.Types.Mixed],
    watches: [Schema.Types.Mixed],
    comments: [Schema.Types.Mixed]
  }
});

var User = mongoose.model('users', UserSchema); //name of collection is 'users'

UserSchema.plugin(findOrCreate);

module.exports.User = User;
module.exports.Schema = UserSchema;