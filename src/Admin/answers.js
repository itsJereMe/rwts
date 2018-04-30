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
       question: 0,
       questionText: '',
       loaded: false
    };
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      player: nextProps.player,
      question: nextProps.question,
      loaded: false
    })
    if (nextProps.question >= 1) {
      axios.get(`http://server:3001/api/admin/qnr/${nextProps.question}`)
      .then(res => {
        this.setState({
          questionText: res.data[0].question
        });
      })
      .catch(err => {
        console.log(err);
      });
    }
  }

  componentDidUpdate() {
    if (this.state.question > 0) {
      if (!this.state.loaded) {
        // console.log("Hi, I'm rollin...")
        var { question, player } = this.state;
        // console.log(question);
        axios.get(`http://server:3001/api/admin/${question}/${player}`)
        .then(res => {
          this.setState({ data: res.data, loaded: true });
          // console.log(res.data)
        })
        .catch(err => {
          console.error(err);
        });
      }
    }
  }

  updateAnswers() {
  }
  
  render() {
    var { data } = this.state;
    return (
      <div>
        {data.length > 0 
        ?
          <div>
            <h2>Vraag {data[0].question}: {this.state.questionText} </h2>
            <h4>De antwoorden van {data[0].player} hierop zijn:</h4>
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
