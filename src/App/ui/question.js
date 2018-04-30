import React, { Component } from 'react';
import axios from 'axios';

export default class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionData: []
    }
  }

  componentDidMount() {
    axios.get(`http://server.schapie-online.nl:3001/api/admin/qnr/${this.props.question}`)
    .then(res => {
      this.setState({
        questionData: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });

  }

  render() {
    return (
      <div>
        <h4>Vraag {this.props.question}:</h4>
        {this.state.questionData.map((value, index) => (
          <div key={index}>
            <h5 className='pad'>{value.question}</h5>
          </div>
        ))}
      </div>
    )
  }
};
