//import { get } from "../utils/APIUtils";

import { Recipe } from '../models/recipe';

export default {
  name: "recipe",

  read(req, resource, { id }, config, done) {
  	//console.log('recipe id=', id);
	  Recipe.find({inc_id: id})
	  .populate('categories')
	  .populate('author')
	  .exec(function(err, result) {
      if (!err) {
          //console.log('recipe find result', result);
          done(null, result);
      } else {
          // error handling
          done(err);
          console.log('mongo error');
      };
	  });
  }

};
