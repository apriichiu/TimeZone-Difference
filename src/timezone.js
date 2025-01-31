Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
}

function FormattedDate(props) {
  return <h2 className="formattedDate" >It is {props.date.toLocaleTimeString()}.</h2>;
}

function getHours( city ) {
    var hours= 0;
    switch( city ) {
      case 'Berlin' : hours = 8; break;
      case 'London' : hours = 7; break;
      case 'Moscow' : hours = 10; break;
      case 'New York' : hours = 3; break;
      case 'Shanghai'  : hours = 15; break;
      case 'Rome' : hours = 8; break;
      case 'Sydney': hours = 18; break;
      case 'Hawaii': hours = -2; break;
      case 'Alaska': hours = -1; break;
      case 'San Francisco': hours = 0; break;
      case 'Los Angeles': hours = 0; break;
      case 'Salt Lake City': hours = 1; break;
      case 'Chicago': hours = 2; break;
      case 'Mumbai': hours = 12.5; break;
      case 'Paris': hours = 8; break;
      case 'Tokyo': hours = 16; break;
      case 'Singapore': hours = 15; break;
      case 'Taiwan': hours = 15; break;
      default: hours = 0;
    }
    return hours;
  }

function setCityTime (city){
    var now = new Date();
    var hours = getHours(city);
    return now.addHours(hours);
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
        this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {date: new Date(),
                 city: props.city};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  handleChange(event) {
   this.setState({city: event.target.value});
  }

  handleSubmit(event) {
    this.setState({city: event.target.value});
    event.preventDefault();
  }

  render() {
    return (
      <div class="Clock">
        <h1 className="hellocity" >Hello, {this.props.city}!</h1>
        <FormattedDate className="actualtime" date={setCityTime(this.props.city)}/>
      </div>
    );
  }
}

class CityInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange= this.handleChange.bind(this);
    this.state = {city: ''};
  }

  handleChange(e) {
    this.setState({city: e.target.value});
  }

  render() {
    const city = this.state.city;
    return (
      <form onSubmit={this.handleSubmit}>
          <label> City:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
     </form>
    );
  }
}

function findTimezoneDifference(c1, c2 ){
  var t1 = getHours(c1);
  var t2 = getHours(c2);
  return t1 - t2;
}
function Title(props) {
  return <h1 className="title">Time Difference Calculator</h1>
}
function Diff(props) {
  return <h2 className="difference">The hours difference between <br /><span className="city1">{props.c1}</span>&nbsp;&nbsp;and&nbsp;&nbsp;<span className="city2">{props.c2}</span>&nbsp;&nbsp;is: <br/><br/><span id="diffresult">{findTimezoneDifference(props.c1, props.c2)} hours</span></h2>
}

class App extends React.Component {
    constructor(props) {
    super(props);
    this.handleChangeC1 = this.handleChangeC1.bind(this);
    this.handleChangeC2 = this.handleChangeC2.bind(this);
    this.state = {c1: '', c2: ''};
  }
  handleChangeC1(e) {
    this.setState({c1: e.target.value});
  }
  handleChangeC2(e) {
    this.setState({c2: e.target.value});
  }

  render() {

    return(
    <div>
      <div className="topPanel">
      <Title />
      </div>
      <div className="leftPanel">
      <Diff c1={this.state.c1} c2={this.state.c2}/>
      </div>
      <div className="rightPanel">
      <div className="clockPanel">
      <Clock city={this.state.c1} onCityChange={this.state.c1} />
      <form>
          <label> City:
          <input type="text" value={this.state.c1} onChange={this.handleChangeC1} />
          </label>
     </form>
     </div>
     <div className="clockPanel">
      <Clock city={this.state.c2} />
      <form>
          <label> City:
          <input type="text" value={this.state.c2} onChange={this.handleChangeC2} />
          </label>
     </form>
     </div>
     </div>
    </div>
      );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
