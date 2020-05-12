import React, { Component } from 'react';
import axios from 'axios';

// import style
import '../App/css/style.css';

import { Link } from 'react-router-dom';
import {List,ListItem} from 'material-ui/List';

export default class PresenterQuestions extends Component {
  constructor(props) {
  super(props)
    this.state = {
      api: process.env.REACT_APP_API_URL+'/admin',
      answerData: [],
      questionData: [],
      cquestion: 0,
      cplayer: '',
      stateMachine:0,
      firstLoad:true,
      time: 0
    };
    this.countItems = this.countItems.bind(this);
  };

  interval;

  componentDidMount() {
    this.setState({firstLoad:true});
    this.interval = setInterval(() => this.setState({ firstLoad:true }), 10000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cquestion !== this.state.cquestion || this.state.firstLoad ) {
      axios.get(process.env.REACT_APP_API_URL+'/admin/all')
      .then(res => {
        var newData = [];
        Object.values(res.data).forEach((value, index) => { 
          if(!newData[value.question]) {
            newData[value.question] = [];
          }
          newData[value.question].push(value);
        });
        console.log("newData", newData);
        this.setState({ answerData: newData });
        // console.log(res.data)
      })
      .catch(err => {
        console.error(err);
      });
      axios.get(process.env.REACT_APP_API_URL+'/admin/question')
      .then(res => {
        this.setState({ questionData: res.data, firstLoad:false });
      })
      .catch(err => {
        console.error(err);
      });
    }
  }

  countItems(input) {
    var arr = input
    var counts = [];
    for (var i = 0; i < arr.length; i++) {
        counts[arr[i]] = 1 + (counts[arr[i]] || 0);
    }
    return counts;
  }

  PlayerClick(question, player) {
    this.setState({
      cquestion: question,
      cplayer: player
    });
    //this.props.history.push('/view/question/'+question);
    // console.log(question, player);
  }

  AnswerClick(question, player) {
    this.props.history.push('/view/question/'+question+'/player/'+player);
  }

  render() {
    const lItems = [];
    var { stateMachine } = this.state;
    let questions = this.state.questionData;
    for (let nr in questions) {
      console.log(questions[nr]);
      lItems.push(
        <div key={questions[nr].questionNr}>
          <ListItem
            className="questions-list"
            primaryText={`Vraag ${questions[nr].questionNr}`}
            key={`0.${questions[nr].questionNr}`}
            initiallyOpen={false}
            primaryTogglesNestedList={true}
            onClick={() => this.PlayerClick(questions[nr].questionNr, "")}
            nestedItems={ this.state.answerData[questions[nr].questionNr] ? (
              this.state.answerData[questions[nr].questionNr].map((value, index) => (
                  <ListItem
                      className="questions-list-item"
                      key={'q'+index}
                      onClick={() => this.AnswerClick(questions[nr].questionNr, value.playerId)}
                      primaryText={value.user ? (value.user.length ? value.user[0].name : "Onbekende") : "Onbekend"}
                      leftIcon={<i className="small material-icons right">person</i>}
                  />
              ))
              ) : ([<ListItem className="questions-list-item" key="q0" primaryText="Nog niemand"/>])}
          />
        </div>
      );
    }
  
    return (
      <div className="vertical-flex">
        {stateMachine <= 0 ? (
          <div className="view-questions">
            <List>
              {lItems}
            </List>
          </div>
        ):null}

      </div>

    )
  }
};
