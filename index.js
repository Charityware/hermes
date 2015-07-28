var React = require('react');
var emptyFunction = require('react/lib/emptyFunction');
var PropTypes = React.PropTypes;

function formatButtons(buttons) {
  if (typeof buttons === 'string') {
    buttons = [buttons];
  }

  if (buttons) {
    buttons = buttons.map(function(button) {
      if (typeof button === 'string') {
        return {
          name: button
        };
      }
      return button;
    });
  }
  return buttons || null;
}

module.exports = React.createClass({

  displayName: 'react-Luxo',
  propTypes: {
    id: PropTypes.number.isRequired,
    onDismiss: PropTypes.func,
    hidden: PropTypes.bool,
    timeout: PropTypes.number,
    autoDismiss: PropTypes.bool,
    message: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ]).isRequired,
    type: PropTypes.string.isRequired,
    /**
     * Buttons can be either `string` or `array`
     *
     * Example:
     *
     * ```
     *  <Luxo buttons='close'/>
     *  or
     *  <Luxo buttons=[{name: 'close'}, {name: 'retry'}] />
     *  or
     *  <Luxo buttons=[{name: 'close', listener: somefunction}] />
     *  or
     *  <Luxo buttons=[{name: 'close', className: 'btn close', listener: somefunction}] />
     * ```
     */
    buttons: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string
      })),
      PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        className: PropTypes.string,
        listener: PropTypes.func
      }))
    ])
  },

  getDefaultProps: function() {
    return {
      onDismiss: emptyFunction,
      timeout: 3000,
      autoDismiss: true
    };
  },

  getInitialState: function() {
    return {
      hidden: false,
      ttd: null,
      message: this.props.message,
      type: this.props.type
    };
  },

  dismiss: function() {
    this.setState({
      hidden: true
    });
    this.props.onDismiss();
    this.clearTimeout();
    return this;
  },

  clearTimeout: function() {
    if (this.state.ttd) {
      clearTimeout(this.state.ttd);
      this.setState({
        ttd: null
      });
    }
    return this;
  },

  handleClick: function(event) {
    this.dismiss();
    var item = this.state.buttons.filter(function(button) {
      return button.name.toLowerCase() === event.target.id;
    })[0];
    if (item && item.listener) {
      item.listener(event);
    }
  },

  componentDidMount: function() {
    this.changeState(this.props);
  },

  componentWillUnmount: function() {
    this.clearTimeout();
  },

  changeState: function(nextProps) {
    var buttons = formatButtons(nextProps.buttons);

    var message = nextProps.message;
    if (typeof message === 'string') {
      message = [message];
    }
    var autoDismiss = nextProps.autoDismiss ? (buttons ? false : true) : nextProps.autoDismiss;
    if (autoDismiss && !nextProps.hidden) {
      var ttd = setTimeout(this.dismiss, nextProps.timeout || this.props.timeout);
      this.setState({
        ttd: ttd,
        hidden: nextProps.hidden,
        buttons: buttons,
        message: message,
        type: nextProps.type
      });
    } else {
      this.setState({
        hidden: nextProps.hidden,
        buttons: buttons,
        message: message,
        type: nextProps.type
      });
    }
  },

  componentWillReceiveProps: function(nextProps) {
    this.changeState(nextProps);
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    if (nextProps.id === this.props.id) {
      return !!nextState.hidden;
    }
    return true;
  },

  render: function() {
    return React.createElement('div', {
      className: 'luxo',
      hidden: this.state.hidden
    },
      React.createElement('div', {
        className: this.state.type
      },
        (this.state.message instanceof Array) ? this.state.message.map(function(msg, i) {
          return React.createElement('div', {
            key: i,
            className: 'message'
          }, msg);
        }) : React.createElement('div', {
          className: 'message'
        }, this.state.message),
        this.state.buttons ? React.createElement('div', {
          className: 'buttons'
        },
          this.state.buttons.map(function(button, i) {
            return React.createElement('button', {
              id: button.name.toLowerCase(),
              key: i,
              className: button.className ? button.className : button.name.toLowerCase(),
              onClick: this.handleClick
            }, button.name);
          }, this)
        ) : null
      )
    );
  }
});
