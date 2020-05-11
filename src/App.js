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


  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      !prevState ||
      prevState.thisQuestion !== nextProps.match.params.question
    ) {
      if (typeof nextProps.match.params.question === 'undefined') {
        return {thisQuestion:1};
      } else {
        return {
          thisQuestion: nextProps.match.params.question
        };
      }
    }
}

  render() {
     
    return (
      <div className="App">
        <Header />
        <Question question={this.state.thisQuestion}/>
        <Answer 
          api={process.env.REACT_APP_API_URL+'/comments'}
          pollInterval={2000}
          contester={this.state.playerName}
          question={this.state.thisQuestion}
        />
      </div>
    );
  }
}

export default App;