import React, { Component } from 'react';

import Result from './result';
import Menu from './Menu';

// import style
import '../App/css/style.css';

import {List,ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: 0
    };
  }

  setQuestion = (question) => {
    this.setState({
      question: question
    });
  }
  
  render() {

    const lItems = [];
    for (let i = 1; i <= 9; i++) {
      lItems.push(
        <div key={`1.${i}`}>
          <ListItem
            primaryText={`Vraag ${i}`}
            key={`0.${i}`}
            onClick={() => this.setQuestion(i)}
          />
          <Divider />
        </div>
      );
    }


    return (
      <div>
        <div className="Answer-header">
        <h1>Overzicht antwoorden</h1>
        <Menu />
      </div>
      <div className="answer top-margin">
        <div className="sidebar">
          <List>
            <Subheader>Vragen</Subheader>
            <Divider />
            {lItems}
          </List>
        </div>
        <div className="answers">
          <Result question={this.state.question} />
        </div>
      </div>
    </div>
);
  }
}

export default Results;