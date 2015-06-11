import Actions from "../constants/Actions";

// Tip: in your fetchr service calls, make sure you set a timeout higher than
// the default of 3000ms. See https://github.com/yahoo/fetchr/issues/58
const TIMEOUT = 20000;

const PhotoActionCreators = {

  loadPhoto(context, { id, imageSize }, done) {

    /*context.service.read("photo", { id }, { timeout: TIMEOUT },
      (err, data) => {
        if (err) {
          return done(err);
        }
        context.dispatch(Actions.LOAD_PHOTO_SUCCESS, data.photo);
        done();
      }
    );*/
  }

};

export default PhotoActionCreators;
