import React from 'react/addons';
var createSideEffect = require('react-side-effect');

var _serverStyle = null;

var BodyStyle = createSideEffect(function handleChange(propsList) {
  var style = {};
  propsList.forEach(function (props) {
    Object.assign(style, props.style);
  });

  if (typeof document !== 'undefined') {
    for (var key in style) {
      document.body.style[key] = style[key];
    }
  } else {
    for (var key in style) {
      _serverStyle = style[key];
    }
  }
},{
  displayName: 'BodyStyle',

  propTypes: {
    style: React.PropTypes.string.isRequired
  },

  statics: {
    peek: function () {
      return _serverTitle;
    },

    rewind: function () {
      var style = _serverStyle;
      this.dispose();
      return style;
    }
  }
});

module.exports = BodyStyle;
