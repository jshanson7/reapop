'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Notification = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _helpers = require('../helpers');

var _notifications = require('../store/notifications');

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Create a timer
 * @param {Number} dismissAfter
 * @param {Function} callback
 * @returns {Function|null} a Timer
 */
function createTimer(dismissAfter, callback) {
  if (dismissAfter > 0) {
    return new _helpers.Timer(dismissAfter, callback);
  }
  return null;
}

var Notification = exports.Notification = function (_Component) {
  _inherits(Notification, _Component);

  /**
   * Init timer
   * @param {Object} props
   * @returns {void}
   */
  function Notification(props) {
    _classCallCheck(this, Notification);

    var dismissAfter = props.notification.dismissAfter;

    var _this = _possibleConstructorReturn(this, (Notification.__proto__ || Object.getPrototypeOf(Notification)).call(this, props));

    _this._remove = function () {
      var _this$props = _this.props,
          removeNotification = _this$props.removeNotification,
          id = _this$props.notification.id;

      removeNotification(id);
    };

    _this._pauseTimer = function () {
      var timer = _this.state.timer;

      timer.pause();
    };

    _this._resumeTimer = function () {
      var timer = _this.state.timer;

      timer.resume();
    };

    _this._setHTML = function (content) {
      return {
        __html: content
      };
    };

    _this._renderButtons = function () {
      var _this$props2 = _this.props,
          className = _this$props2.className,
          buttons = _this$props2.notification.buttons;


      return buttons.map(function (_ref) {
        var name = _ref.name,
            onClick = _ref.onClick,
            primary = _ref.primary;
        return _react2.default.createElement(
          'button',
          { key: name, className: className.button, onClick: onClick },
          _react2.default.createElement(
            'div',
            { className: className.buttonText },
            primary ? _react2.default.createElement(
              'b',
              null,
              name
            ) : name
          )
        );
      });
    };

    _this.state = {
      timer: createTimer(dismissAfter, _this._remove)
    };
    return _this;
  }

  /**
   * Run `onAdd` callback function when component is mounted
   * @returns {void}
   */


  _createClass(Notification, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var onAdd = this.props.notification.onAdd;

      if (typeof onAdd === 'function') {
        onAdd();
      }
    }

    /**
     * Run `onRemove` callback function when component will unmount
     * @returns {void}
     */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var onRemove = this.props.notification.onRemove;

      if (typeof onRemove === 'function') {
        onRemove();
      }
    }

    /**
     * Update timer
     * @param {Object} nextProps
     * @returns {void}
     */

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var dismissAfter = nextProps.notification.dismissAfter;

      this.setState({
        timer: createTimer(dismissAfter, this._remove)
      });
    }

    /**
     * Remove the notification
     * @private
     * @returns {void}
     */


    /**
     * Pauses the timer
     * @returns {void}
     * @private
     */


    /**
     * Resumes the timer
     * @returns {void}
     * @private
     */


    /**
     * Wrap content in an object ready for HTML
     * @param {String} content a text
     * @returns {Object}
     * @private
     */


    /**
     * Render button(s)
     * @returns {*}
     */

  }, {
    key: 'render',


    /**
     * Render
     * @returns {XML}
     */
    value: function render() {
      var _props = this.props,
          className = _props.className,
          _props$notification = _props.notification,
          title = _props$notification.title,
          message = _props$notification.message,
          status = _props$notification.status,
          dismissible = _props$notification.dismissible,
          closeButton = _props$notification.closeButton,
          buttons = _props$notification.buttons,
          image = _props$notification.image,
          allowHTML = _props$notification.allowHTML;
      var timer = this.state.timer;

      var isDismissible = dismissible && buttons.length === 0;
      var notificationClass = [className.main, className.status(status), className.buttons(buttons.length), isDismissible && !closeButton ? className.dismissible : null].join(' ');

      if (timer) {
        this._resumeTimer();
      }

      return _react2.default.createElement(
        'div',
        {
          className: className.wrapper,
          onClick: isDismissible && !closeButton ? this._remove : '',
          onMouseEnter: timer ? this._pauseTimer : '',
          onMouseLeave: timer ? this._resumeTimer : ''
        },
        _react2.default.createElement(
          'div',
          { className: notificationClass },
          image ? _react2.default.createElement(
            'div',
            { className: className.imageContainer },
            _react2.default.createElement('span', { className: className.image, style: { backgroundImage: 'url(' + image + ')' } })
          ) : _react2.default.createElement('span', { className: className.icon }),
          _react2.default.createElement(
            'div',
            { className: className.meta },
            title ? allowHTML ? _react2.default.createElement('div', { className: className.title, dangerouslySetInnerHTML: this._setHTML(title) }) : _react2.default.createElement(
              'div',
              { className: className.title },
              title
            ) : null,
            message ? allowHTML ? _react2.default.createElement('div', { className: className.message, dangerouslySetInnerHTML: this._setHTML(message) }) : _react2.default.createElement(
              'div',
              { className: className.message },
              message
            ) : null
          ),
          isDismissible && closeButton ? _react2.default.createElement(
            'div',
            { className: className.closeButtonContainer },
            _react2.default.createElement('span', { className: className.closeButton, onClick: this._remove })
          ) : null,
          buttons.length ? _react2.default.createElement(
            'div',
            { className: className.buttons(), onClick: this._remove },
            this._renderButtons()
          ) : null
        )
      );
    }
  }]);

  return Notification;
}(_react.Component);

Notification.propTypes = {
  className: _propTypes2.default.shape({
    main: _propTypes2.default.string.isRequired,
    wrapper: _propTypes2.default.string.isRequired,
    meta: _propTypes2.default.string.isRequired,
    title: _propTypes2.default.string.isRequired,
    message: _propTypes2.default.string.isRequired,
    imageContainer: _propTypes2.default.string.isRequired,
    image: _propTypes2.default.string.isRequired,
    icon: _propTypes2.default.string.isRequired,
    status: _propTypes2.default.func.isRequired,
    dismissible: _propTypes2.default.string.isRequired,
    closeButtonContainer: _propTypes2.default.string.isRequired,
    closeButton: _propTypes2.default.string.isRequired,
    buttons: _propTypes2.default.func.isRequired,
    button: _propTypes2.default.string.isRequired,
    buttonText: _propTypes2.default.string.isRequired
  }).isRequired,
  notification: _propTypes2.default.shape({
    id: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired,
    title: _propTypes2.default.node,
    message: _propTypes2.default.node,
    image: _propTypes2.default.string,
    status: _propTypes2.default.string.isRequired,
    position: _propTypes2.default.oneOf((0, _helpers.mapObjectValues)(_constants.POSITIONS)),
    dismissAfter: _propTypes2.default.number.isRequired,
    dismissible: _propTypes2.default.bool.isRequired,
    onAdd: _propTypes2.default.func,
    onRemove: _propTypes2.default.func,
    closeButton: _propTypes2.default.bool.isRequired,
    buttons: _propTypes2.default.arrayOf(_propTypes2.default.shape({
      name: _propTypes2.default.node.isRequired,
      onClick: _propTypes2.default.func
    })).isRequired,
    allowHTML: _propTypes2.default.bool.isRequired
  }).isRequired,
  removeNotification: _propTypes2.default.func.isRequired
};
exports.default = (0, _reactRedux.connect)(null, { removeNotification: _notifications.removeNotification })(Notification);