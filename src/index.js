import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import moment from 'moment';
//import FormattedDuration from 'react-intl-formatted-duration';
//import styled from 'styled-components';

class StopWatch extends React.Component{
    constructor(props){
       super(props);
       this.handleStartClick=this.handleStartClick.bind(this);
       this.handlePauseClick=this.handlePauseClick.bind(this);
       this.handleSpliteClick=this.handleSpliteClick.bind(this);
       this.handleResetClick=this.handleResetClick.bind(this);
      // this.formatTime = this.formatTime.bind(this);
      // this.Timer = this.Timer.bind(this);
       this.state = {
        secondsElapsed: 0, 
        laps: [],
        lastClearedIncrementer: null,
       };
       this.incrementer = null;
    }
    handleStartClick(){
        this.incrementer = setInterval( () =>
        this.setState({
        secondsElapsed: this.state.secondsElapsed + 1
      }), 1000);
    }
    handlePauseClick(){
        clearInterval(this.incrementer);
        this.setState({
        lastClearedIncrementer: this.incrementer
        });
    }
    handleSpliteClick(){
        this.setState({
        laps: this.state.laps.concat([this.state.secondsElapsed])
        })
    }
    handleResetClick(){
        clearInterval(this.incrementer);
        this.setState({
        secondsElapsed: 0,
        laps: []
        });
    }
    

    render(){
        return(
            <div className="stopwatch">
          
            <h1 className="stopwatch-timer">{msToTime(this.state.secondsElapsed)}</h1>
             {(this.state.secondsElapsed === 0 ||
              this.incrementer === this.state.lastClearedIncrementer ? <Button className="start-btn" onClick={this.handleStartClick}>Start</Button>
              : <Button className="stop-btn" onClick={this.handlePauseClick}>Pause</Button>
            )}
            
            {(this.state.secondsElapsed !== 0 &&
              this.incrementer !== this.state.lastClearedIncrementer ? <Button onClick={this.handleSpliteClick}>Lab</Button> : null
            )}
    
    
            {(this.state.secondsElapsed !== 0 &&
              this.incrementer === this.state.lastClearedIncrementer ? <Button onClick={this.handleResetClick}>Reset</Button> : null
            )}
    
            <ul className="stopwatch-laps">
              { this.state.laps.map((lap, i) =>
                  <li className="stopwatch-lap"><strong>{i + 1}</strong>{msToTime(lap)}</li>)
              }
            </ul>
          </div>
        );
      }
}

/*const Timer = (sec) => {
  const duration = moment.duration()
  const centiseconds = Math.floor(duration.milliseconds() / 10)
  return (
    <p>
      {duration.hours()}:{duration.minutes()}:{duration.seconds()}:{centiseconds}
    </p>
  )
}*/
function msToTime(s)  {
  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  return hrs + ':' + mins + ':' + secs + '.' + ms;
}

/*const formattedSeconds = (sec) =>
  Math.floor(sec / 60) +
    ':' +
('0' + sec % 60).slice(-2)*/

class Button extends React.Component {
    render() {
      return <button type="button" {...this.props}
                     className={"btn " + this.props.className } />;
    }
}

ReactDOM.render(<StopWatch />,document.getElementById('root'));
