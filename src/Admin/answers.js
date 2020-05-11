import React, { Component } from 'react';
import axios from 'axios';

// import style
import '../App/css/style.css';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


export default class Answers extends Component {
  constructor(props) {
    super(props)
    this.updateAnswers = this.updateAnswers.bind(this);
    this.state = {
       data: {},
       player: '',
       playerId: '',
       question: 0,
       questionText: ''
    };
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.question !== prevState.question || nextProps.playerId !== prevState.playerId) {
      return {
        question:nextProps.question,
        player:nextProps.player,
        playerId:nextProps.playerId
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("update answer.js triggered");
    if (prevState.question !== this.state.question || prevState.playerId !== this.state.playerId) {
      if (this.state.question > 0) {
          var { question, playerId } = this.state;
          axios.get(`${process.env.REACT_APP_API_URL}/admin/question/${question}`)
          .then(res => {
            this.setState({questionText: res.data[0].question});
            return axios.get(`${process.env.REACT_APP_API_URL}/admin/${question}/${playerId}`);
          })
          .then(res => {
            this.setState({ data: res.data});
             console.log("update", res.data)
          })
          .catch(err => {
            console.log(err);
          });
        }
    }
  }

  updateAnswers() {
  }
  
  render() {
    var { data } = this.state;
    console.log("render: ", data);
    return (
      <div>
        {data.length > 0 
        ?
          <div>
            <h2>Vraag {data[0].question}: {this.state.questionText} </h2>
            <h4>De antwoorden van {data[0].user[0].name} hierop zijn:</h4>
            <Table>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn style={{width: 150}}>Speler</TableHeaderColumn>
                  <TableHeaderColumn style={{width: 100}}>Punten</TableHeaderColumn>
                  <TableHeaderColumn>Opmerking</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {data[0].answers.map((value, index) => (
                  <TableRow key={index}>
                    <TableRowColumn style={{width: 150}}>{value.player}</TableRowColumn>
                    <TableRowColumn style={{width: 100}}>{value.points}</TableRowColumn>
                    <TableRowColumn>{value.comment}</TableRowColumn>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        :
          <h2>Selecteer eerst een speler bij een vraag...</h2>
        }
      </div>
    )
  }
};
