Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
}

function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}

function setCityTime( city ) {
    var now = new Date();
    var hours = 0;
    switch( city ) {
      case 'Fremont' : hours = 0; break;
      case 'New York' : hours = 3; break;
      case 'London' : hours = 7; break;
      case 'Taiwan' : hours = 15; break;
      case 'India'  : hours = 12.5; break;
      case 'Africa' : hours = 9; break;
      case 'Washington D.C.': hours = 3; break;
      default: hours = 0;
    }
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
        <h1>Hello, {this.props.city}!</h1>
        <FormattedDate date={setCityTime(this.props.city)}/>
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
  var t1 = setCityTime(c1);
  var t2 = setCityTime(c2);
  return Math.floor(((Math.abs(t2 - t1))% 86400000) / 3600000);
}
function Title(props) {
  return <h1>Time Difference Calculator</h1>
}
function Diff(props) {
  return <h2>The hours difference between {props.c1} and {props.c2} is: <br/><br/><span id="diffresult">{findTimezoneDifference(props.c1, props.c2)} hours</span></h2>
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
      <Title />
      <Diff c1={this.state.c1} c2={this.state.c2}/>
      <Clock city={this.state.c1} onCityChange={this.state.c1} />
          <form>
          <label> City:
          <input type="text" value={this.state.c1} onChange={this.handleChangeC1} />
          </label>
     </form>
      <Clock city={this.state.c2} />
            <form>
          <label> City:
          <input type="text" value={this.state.c2} onChange={this.handleChangeC2} />
          </label>
     </form>
    </div>
      );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
