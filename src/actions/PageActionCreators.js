import Actions from "../constants/Actions";

const PhotoActionCreators = {

  pageLoaded(context, {}, done){
    context.dispatch(Actions.CHANGE_ROUTE_SUCCESS);
    done();
  }

};

export default PhotoActionCreators;
