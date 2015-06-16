import React from 'react/addons';
import createSideEffect from 'react-side-effect';
import { uniq } from 'lodash';

let _serverClass = null;

const BodyClass = createSideEffect(function handleChange(propsList) {
  let classes = [];

  propsList.forEach(function (props) {
    var a = props.className.split(' ');
    a.forEach(function(nestedProp){
      classes.push(nestedProp);
    })
  });
  classes = uniq(classes).join(' ');

  if (typeof document !== 'undefined') {
      document.body.className = classes
  } else {
      _serverClass = classes
  }
},{
  displayName: 'BodyClass',

  statics: {
    peek: function () {
      return _serverClass;
    },

    rewind: function () {
      var classes = _serverClass;
      this.dispose();
      return classes;
    }
  }
});

module.exports = BodyClass;
