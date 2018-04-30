// import React dependencies
import React, { Component } from 'react';

// import quiz items
import Header from './App/ui/header';
import Question from './App/ui/question';
import Answer from './App/ui/answer';

class App extends Component {
  state = {
    playerName: '',
    isPlayer: false,
    thisQuestion: 1
  }

  componentWillMount() {
    if (typeof this.props.match.params.question === 'undefined') {
      // window.location.replace('http://server.schapie-online.nl:3000/q/1');
      this.setState({thisQuestion: 1});
    } else {
      this.setState({thisQuestion: this.props.match.params.question});
    }
  }

  setPlayer(player) {
    this.setState({
      playerName: player,
      isPlayer: true
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Question question={this.state.thisQuestion}/>
        <Answer 
          url='http://server.schapie-online.nl:3001/api/comments'
          pollInterval={2000}
          contester={this.state.playerName}
          question={this.state.thisQuestion}
        />
      </div>
    );
  }
}

export default App;
