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


export default class Result extends Component {
  constructor(props) {
    super(props)
    this.updateAnswers = this.updateAnswers.bind(this);
    this.state = {
       data: [],
       question: 0,
       loaded: false
    };
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      question: nextProps.question,
      loaded: false
    })
  }

  componentDidUpdate() {
    if (this.state.question > 0) {
      if (!this.state.loaded) {
        // console.log("Hi, I'm rollin...")
        var { question } = this.state;
        // console.log(question);
        axios.get(`http://server.schapie-online.nl:3001/api/admin/results/${question}`)
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
    const { data } = this.state;
    var score = Array.from(
      data.reduce((m, { answers }) =>
          answers.reduce((n, { player, points }) =>
              n.set(player, (n.get(player) || 0) + points), m), new Map()),
      ([player, score]) => ({ player, score })
    );

    var list = score.sort(function(a, b) {
      return b.score - a.score;
    });

    return (
      <div>
        {data.length > 0 
        ?
          <div>
            <h2>De uitslag voor vraag {data[0].question} is:</h2>
            <Table style={{width: 250}}>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn style={{width: 150}}>Speler</TableHeaderColumn>
                  <TableHeaderColumn style={{width: 100}}>Punten</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {list.map((value, index) => (
                  <TableRow key={index}>
                    <TableRowColumn style={{width: 150}}>{value.player}</TableRowColumn>
                    <TableRowColumn style={{width: 100}}>{value.score}</TableRowColumn>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        :
          <h2>Selecteer eerst een vraag...</h2>
        }
      </div>
    )
  }
};
