var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};

function FormattedDate(props) {
  return React.createElement(
    'h2',
    { className: 'formattedDate' },
    'It is ',
    props.date.toLocaleTimeString(),
    '.'
  );
}

function getHours(city) {
  var hours = 0;
  switch (city) {
    case 'Berlin':
      hours = 8;break;
    case 'London':
      hours = 7;break;
    case 'Moscow':
      hours = 10;break;
    case 'New York':
      hours = 3;break;
    case 'Shanghai':
      hours = 15;break;
    case 'Rome':
      hours = 8;break;
    case 'Sydney':
      hours = 18;break;
    case 'Hawaii':
      hours = -2;break;
    case 'Alaska':
      hours = -1;break;
    case 'San Francisco':
      hours = 0;break;
    case 'Los Angeles':
      hours = 0;break;
    case 'Salt Lake City':
      hours = 1;break;
    case 'Chicago':
      hours = 2;break;
    case 'Mumbai':
      hours = 12.5;break;
    case 'Paris':
      hours = 8;break;
    case 'Tokyo':
      hours = 16;break;
    case 'Singapore':
      hours = 15;break;
    case 'Taiwan':
      hours = 15;break;
    default:
      hours = 0;
  }
  return hours;
}

function setCityTime(city) {
  var now = new Date();
  var hours = getHours(city);
  return now.addHours(hours);
}

var Clock = function (_React$Component) {
  _inherits(Clock, _React$Component);

  function Clock(props) {
    _classCallCheck(this, Clock);

    var _this = _possibleConstructorReturn(this, (Clock.__proto__ || Object.getPrototypeOf(Clock)).call(this, props));

    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.state = { date: new Date(),
      city: props.city };
    return _this;
  }

  _createClass(Clock, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.timerID = setInterval(function () {
        return _this2.tick();
      }, 1000);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this.timerID);
    }
  }, {
    key: 'tick',
    value: function tick() {
      this.setState({
        date: new Date()
      });
    }
  }, {
    key: 'handleChange',
    value: function handleChange(event) {
      this.setState({ city: event.target.value });
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      this.setState({ city: event.target.value });
      event.preventDefault();
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { 'class': 'Clock' },
        React.createElement(
          'h1',
          { className: 'hellocity' },
          'Hello, ',
          this.props.city,
          '!'
        ),
        React.createElement(FormattedDate, { className: 'actualtime', date: setCityTime(this.props.city) })
      );
    }
  }]);

  return Clock;
}(React.Component);

var CityInput = function (_React$Component2) {
  _inherits(CityInput, _React$Component2);

  function CityInput(props) {
    _classCallCheck(this, CityInput);

    var _this3 = _possibleConstructorReturn(this, (CityInput.__proto__ || Object.getPrototypeOf(CityInput)).call(this, props));

    _this3.handleChange = _this3.handleChange.bind(_this3);
    _this3.state = { city: '' };
    return _this3;
  }

  _createClass(CityInput, [{
    key: 'handleChange',
    value: function handleChange(e) {
      this.setState({ city: e.target.value });
    }
  }, {
    key: 'render',
    value: function render() {
      var city = this.state.city;
      return React.createElement(
        'form',
        { onSubmit: this.handleSubmit },
        React.createElement(
          'label',
          null,
          ' City:',
          React.createElement('input', { type: 'text', value: this.state.value, onChange: this.handleChange })
        ),
        React.createElement('input', { type: 'submit', value: 'Submit' })
      );
    }
  }]);

  return CityInput;
}(React.Component);

function findTimezoneDifference(c1, c2) {
  var t1 = getHours(c1);
  var t2 = getHours(c2);
  return t1 - t2;
}
function Title(props) {
  return React.createElement(
    'h1',
    { className: 'title' },
    'Time Difference Calculator'
  );
}
function Diff(props) {
  return React.createElement(
    'h2',
    { className: 'difference' },
    'The hours difference between ',
    React.createElement('br', null),
    React.createElement(
      'span',
      { className: 'city1' },
      props.c1
    ),
    '\xA0\xA0and\xA0\xA0',
    React.createElement(
      'span',
      { className: 'city2' },
      props.c2
    ),
    '\xA0\xA0is: ',
    React.createElement('br', null),
    React.createElement('br', null),
    React.createElement(
      'span',
      { id: 'diffresult' },
      findTimezoneDifference(props.c1, props.c2),
      ' hours'
    )
  );
}

var App = function (_React$Component3) {
  _inherits(App, _React$Component3);

  function App(props) {
    _classCallCheck(this, App);

    var _this4 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this4.handleChangeC1 = _this4.handleChangeC1.bind(_this4);
    _this4.handleChangeC2 = _this4.handleChangeC2.bind(_this4);
    _this4.state = { c1: '', c2: '' };
    return _this4;
  }

  _createClass(App, [{
    key: 'handleChangeC1',
    value: function handleChangeC1(e) {
      this.setState({ c1: e.target.value });
    }
  }, {
    key: 'handleChangeC2',
    value: function handleChangeC2(e) {
      this.setState({ c2: e.target.value });
    }
  }, {
    key: 'render',
    value: function render() {

      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { className: 'topPanel' },
          React.createElement(Title, null)
        ),
        React.createElement(
          'div',
          { className: 'leftPanel' },
          React.createElement(Diff, { c1: this.state.c1, c2: this.state.c2 })
        ),
        React.createElement(
          'div',
          { className: 'rightPanel' },
          React.createElement(
            'div',
            { className: 'clockPanel' },
            React.createElement(Clock, { city: this.state.c1, onCityChange: this.state.c1 }),
            React.createElement(
              'form',
              null,
              React.createElement(
                'label',
                null,
                ' City:',
                React.createElement('input', { type: 'text', value: this.state.c1, onChange: this.handleChangeC1 })
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'clockPanel' },
            React.createElement(Clock, { city: this.state.c2 }),
            React.createElement(
              'form',
              null,
              React.createElement(
                'label',
                null,
                ' City:',
                React.createElement('input', { type: 'text', value: this.state.c2, onChange: this.handleChangeC2 })
              )
            )
          )
        )
      );
    }
  }]);

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));