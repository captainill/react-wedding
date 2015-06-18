var React = require('react');
var hoistNonReactStatics = require('hoist-non-react-statics');

var KEYS = {
  enter: 13,
  left: 37,
  right: 39,
  escape: 27,
  backspace: 8,
  comma: 188,
  shift: 16,
  control: 17,
  command: 91
};

/*var pressedKeys = {};

var onKeyDown = function(event) {
  pressedKeys[event.which] = true;
};

var onKeyUp = function(event) {
  pressedKeys[event.which] = null;
};*/

/**
 * Provides keyboard support
 * @method addDocumentKeyBoardSupport
 * @param {React.Component} Component component to wrap
 * @returns {React.Component}
 */

export default function addDocumentKeyBoardSupport(onKeyDown) {
  return function (DecoratedComponent) {
    const displayName =
      DecoratedComponent.displayName ||
      DecoratedComponent.name ||
      'Component';

    class KeyboardSupport extends React.Component {
      static displayName = `addKeyBoardSupport(${displayName})`;

      constructor(props) {
        super(props);

        this.onKeyDown = onKeyDown.bind(this);
      }

      /*onKeyUp(e){
      }

      onKeyDown(e){
      }*/

      componentWillMount() {
        document.addEventListener('keyup', this.onKeyUp);
        document.addEventListener('keydown', this.onKeyDown);
      }

      componentWillUnmount() {
        document.removeEventListener('keyup', this.onKeyUp);
        document.removeEventListener('keydown', this.onKeyDown);
      }

      render() {
        return <DecoratedComponent {...this.props} {...this.state} />;
      }
    };

    // hoisting doesnt work for static function
    // they dont appear in Object.keys
    hoistNonReactStatics(KeyboardSupport, DecoratedComponent);

    return KeyboardSupport;
  };
}
