import keyMirror from "react/lib/keyMirror";

const Actions = keyMirror({

  CHANGE_ROUTE: null,
  CHANGE_ROUTE_SUCCESS: null,
  STATUS_404: null,
  STATUS_500: null,

  LOAD_PHOTO_START: null,
  LOAD_PHOTO_SUCCESS: null,
  LOAD_PHOTO_FAILURE: null,

});

export default Actions;
