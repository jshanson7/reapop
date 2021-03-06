'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotificationsSystem = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _helpers = require('../helpers');

var _NotificationsContainer = require('./NotificationsContainer');

var _NotificationsContainer2 = _interopRequireDefault(_NotificationsContainer);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotificationsSystem = exports.NotificationsSystem = function (_Component) {
  _inherits(NotificationsSystem, _Component);

  function NotificationsSystem() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, NotificationsSystem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = NotificationsSystem.__proto__ || Object.getPrototypeOf(NotificationsSystem)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      windowWidth: window.innerWidth
    }, _this._updateWindowWidth = function () {
      _this.setState({ windowWidth: window.innerWidth });
    }, _this._renderNotificationsContainers = function () {
      var _this$props = _this.props,
          theme = _this$props.theme,
          filter = _this$props.filter;
      var windowWidth = _this.state.windowWidth;

      var positions = (0, _helpers.mapObjectValues)(_constants.POSITIONS);
      var containers = [];
      var notifications = _this.props.notifications;

      if (typeof filter === 'function') {
        notifications = notifications.filter(filter);
      }

      // render all notifications in the same container at the top for small screens
      if (windowWidth < theme.smallScreenMin) {
        return _react2.default.createElement(_NotificationsContainer2.default, {
          key: 't',
          position: 't',
          theme: theme,
          notifications: notifications
        });
      }

      containers.push(positions.map(function (position) {
        var notifs = notifications.filter(function (notif) {
          return position === notif.position;
        });

        return _react2.default.createElement(_NotificationsContainer2.default, {
          key: position,
          position: position,
          theme: theme,
          notifications: notifs
        });
      }));
      return containers;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(NotificationsSystem, [{
    key: 'componentDidMount',


    /**
     * Add resize listener to update window width when the window is resized
     * @returns {void}
     */
    value: function componentDidMount() {
      window.addEventListener('resize', this._updateWindowWidth);
    }

    /**
     * Remove resize listener
     * @returns {void}
     */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this._updateWindowWidth);
    }

    /**
     * Update window width
     * @returns {void}
     * @private
     */


    /**
     * Render notifications containers
     * @returns {XML}
     * @private
     */

  }, {
    key: 'render',


    /**
     * Render
     * @returns {XML}
     */
    value: function render() {
      var className = this.props.theme.notificationsSystem.className;

      return _react2.default.createElement(
        'div',
        { className: className },
        this._renderNotificationsContainers()
      );
    }
  }]);

  return NotificationsSystem;
}(_react.Component);

/**
 * Map state to props
 * @param {Object} state
 * @returns {{notifications: {Array}}}
 */


NotificationsSystem.propTypes = {
  filter: _propTypes2.default.func,
  notifications: _propTypes2.default.array.isRequired,
  theme: _propTypes2.default.shape({
    smallScreenMin: _propTypes2.default.number.isRequired,
    notificationsSystem: _propTypes2.default.shape({
      className: _propTypes2.default.string
    })
  }).isRequired
};
NotificationsSystem.defaultProps = {
  notifications: []
};
function mapStateToProps(state) {
  return {
    notifications: state.notifications
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(NotificationsSystem);