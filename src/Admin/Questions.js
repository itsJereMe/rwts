import React, { Component } from 'react';
import axios from 'axios';

import Menu from './Menu';

import { Input, Row, Icon } from 'react-materialize';
import RaisedButton from 'material-ui/RaisedButton';
import {List,ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

export default class addQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      tempQuestion: '',
      tempQuestionNr: 0,
    }
  }

  componentWillMount() {

  }

  componentDidMount() {
    axios.get('http://server.schapie-online.nl:3001/api/admin/question')
    .then(res => {
      var questionsArr = res.data;
      var highestNr = 0;
      for ( var number in questionsArr ) {
        if (questionsArr[number].questionNr > highestNr) {
          highestNr = questionsArr[number].questionNr;
        }
      }
      
      this.setState({
        questions: res.data,
        tempQuestionNr: Number(highestNr) + 1
      });
      document.getElementById("questionNr").value = Number(highestNr) + 1;
    })
    
    .catch(err => {
      console.log(err);
    });
  }

  handleChangeNr(e) {
  }

  handleChange(e) {
    this.setState({
      tempQuestion: e.target.value
    });
  }

  handleRequestAdd = (question, questionNr) => {
    var newQuestion = {
      QuestionNr: questionNr,
      Question: question
    };
    axios.post('http://server.schapie-online.nl:3001/api/admin/question', newQuestion)
    .then(res => {
      if (res.status === 200) {
        var newQuestionNr = Number(this.state.tempQuestionNr) + 1;
        document.getElementById("questionNr").value = newQuestionNr;
        document.getElementById("question").value = '';
        this.setState({tempQuestionNr: newQuestionNr});
        
        axios.get('http://server.schapie-online.nl:3001/api/admin/question')
        .then(res => {
          this.setState({
            questions: res.data
          });
        })
        .catch(err => {
          console.log(err);
        });
    
      }
    })
    .catch(err => {
        console.error(err);
    });
  }


  render() {
    const { questions } = this.state;

    return (
      <div>
        <div className="Answer-header">
          <h1>Voeg vragen toe</h1>
          <Menu />
        </div>
        <div className="answer top-margin">
          <div className="sidebar-questions">
            <List>
              <Subheader>Vragen</Subheader>
              <Divider />
              {questions.map((value, index) => (
                <div>
                  <ListItem
                    key={value.questionNr}
                    primaryText={value.questionNr + ". " + value.question}
                  />
                  <Divider />
                </div>
              ))}
            </List>
          </div>
          <div className="question-answers">
            <h4>Voeg vragen toe:</h4>
            <br />
            <Row>
              <Input className="input-field fs16" type="number" id="questionNr" defaultValue={this.state.tempQuestionNr} onChange={this.handleChangeNr.bind(this)}><Icon>check</Icon></Input>
              <Input s={8} className="input-field fs16" label="Welke vraag wil je stellen" id="question" onChange={this.handleChange.bind(this)}><Icon>check</Icon></Input>
            </Row>
            <RaisedButton 
              label="Opslaan"
              primary={true}
              onClick={() => this.handleRequestAdd(this.state.tempQuestion, this.state.tempQuestionNr)}
            />
          </div>
        </div>
      </div>
    )
  }
};
