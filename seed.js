var bcrypt = require('bcryptjs');
var async = require('async');
var mongo =  require ('mongodb');
var objectId = mongo.ObjectID;
var mongoose = require('mongoose');
var config = require('./env/config.js')
var getNextSequence = require('./app/models/utils/getNextSequence').getNextSequence;

var User = require('./app/models/user.js').User;
var Recipe = require('./app/models/recipe.js').Recipe;
var Counter = require('./app/models/counter.js').Counter;
var Category = require('./app/models/category.js').Category;

var seedUsers = [
	{
		firstName:	"Admin",
		lastName:	"Account",
		displayName:	"Admin Account",
		password:	"admin-test",
		email:	"admin-test@test.com",
		role:	"admin",
		admin: true,
		_id: objectId("503cf4730e9f580200000002"),
		headline: "Admin of SH",
    approved: true,
    isFeature: true
	},
	{
		firstName:	"JT",
		lastName:	"-",
		displayName:	"JT",
		password:	"Test",
		email:	"1@1.com",
		role:	"user",
		admin: true,
		_id: objectId("503cf4730e9f580200000003"),
		photoUrl: "https://s3.amazonaws.com/photos.angel.co/users/68026-medium_jpg?1344297998",
		headline: "I made this.",
    approved: true,
    isFeature: false
	}
];

var seedCategories = [
	{
		name:	"Vegan",
		description:	"These are Vegan recipes :)",
		_id: objectId("503cf4730e9f580200000004")
	},
	{
		name:	"GF",
		description:	"These are GF recipes!!!!",
		_id: objectId("503cf4730e9f580200000005")
	}	
];

var hashPassword = function (user, callback) {
	// bcypt stores salts inside of the hashed passwords so no need to store salt separately
	bcrypt.hash(user.password, 10, function(error, hash) {
		if (error) throw error;
		user.password = hash;
		callback(null, user);
		// return user;
	});
};

mongoose.connect(process.env.MONGOLAB_URI || config.db)

mongoose.connection.on("open", function(error){
	if (error) throw error;
	else {
		//dropdatabase to clear out old shit first then run parallel
		mongoose.connection.db.dropDatabase(function(){

			async.waterfall([
				function(callback){
					//initiate counter
					Counter.create(
				   	{
				      _id: "recipeid",
				    	seq: 0
				   	},function(err, result){
				   		//handle error if necessary
							callback(err, result);
					})
				},
		    function (result, callback) {
		      getNextSequence("recipeid", callback);
		    },
				function (seq, callback) {
					//ADD RECIPES
					Recipe.create([{	
						inc_id: seq,
						title:'Vegan Broccoli',
						body:'This is the body for Vegan Broccoli',
						author: [seedUsers[1]._id],
						categories: [ seedCategories[0]._id, seedCategories[1]._id ],
						create_at: new Date()
					},{
						inc_id: seq + 1,
						title:'Clams Casino',
						body:'This is the body for Clams Casino !!!!!!!',
						author: [seedUsers[1]._id],
						categories: [ seedCategories[1]._id ],
						create_at: new Date()
					}], function(err, result){
						//console.log('recipes insert result ');
						callback(err, result);
					})
				},
				function(result, callback){
					//ADD CATEGORIES
					Category.create(seedCategories, function(err, result){
						callback(err, result);
					})
				},
				function(result, callback){
					//ADD USERS
					async.map(seedUsers, hashPassword, function(error, result){
						seedUsers = result;
						User.create(seedUsers, function(){
							callback(error, result);
							//db.close();
						});
					})
				}
			],
			// optional callback
			function(err, results){
				//console.log('\n');
			  //console.log('\n', results);
			  mongoose.connection.db.close();
			});
		})			
	}

});