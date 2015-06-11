import Actions from "../constants/Actions";

const PhotoActionCreators = {

  loadRecipe(context, { id }, done) {

    //context.dispatch(Actions.LOAD_RECIPE_START, { id });

    context.service.read("recipe", { id }, { timeout: 20000 },
      (err, data) => {
        if (err) {
          context.dispatch(Actions.LOAD_RECIPE_FAILURE, { id });
          return done(err);
        }

        context.dispatch(Actions.CHANGE_ROUTE_SUCCESS);
        done();
      }

    );
  }

};

export default PhotoActionCreators;
