import React, { Component } from 'react';
import axios from 'axios';

// import style
import '../App/css/style.css';

import { Link } from 'react-router-dom';
import {Card} from 'material-ui/Card';


export default class Answers extends Component {
  constructor(props) {
    super(props)
    this.updateAnswers = this.updateAnswers.bind(this);
    this.state = {
       data: {},
       player: "",
       question: 0,
       questionText: '',
       firstLoad:true,
       class: []
    };
    console.log(this.state);
  };

  componentDidMount () {
    const { question, player } = this.props.match.params
    this.setState(() => ({ question, player }))
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      !prevState ||
      prevState.question !== nextProps.match.params.question
    ) {
      console.log("nextprops",nextProps);
      return {
        player: nextProps.match.params.player,
        question: +nextProps.match.params.question,
        firstLoad:true
      };
    } else 
    return null;
}

  componentDidUpdate(prevProps, prevState) {
    console.log("ja");
    if (prevState.question !== this.state.question || this.state.firstLoad) {
      if (this.state.question > 0) {
          var { question, player } = this.state;
          axios.get(`${process.env.REACT_APP_API_URL}/admin/question/${question}`)
          .then(res => {
            this.setState({questionText: res.data[0].question});
            console.log("new state");
            return axios.get(`${process.env.REACT_APP_API_URL}/admin/${question}/${player}`);
          })
          .then(res => {
            var tempClass= this.state.class;
            res.data[0].answers.forEach((value, index) => {
              tempClass[index]="invisible";
            });
            this.setState({ data: res.data, firstLoad:false, class: tempClass});
            console.log("update", res.data)
            return true;
          })
          .catch(err => {
            console.log(err);
          });
        }
    }
  }

  updateAnswers() {
  }

  viewCard(index, e) {
    var newStyle = this.state.class;
    newStyle[index] = "visible";
    this.setState({class: newStyle});
  }
  
  render() {
    var { data } = this.state;
    console.log("render", this.state);
    return (
        <div className="vertical-flex">
                  <Link to={{pathname: `/view/` }} style={{position:"absolute", top:2, left: 4}}><button>Terug</button></Link>
        {data.length > 0 
        ?
          <div>
            <h4 className="vraagnaam">{data[0].user ? (data[0].user.length ? data[0].user[0].name : "Onbekende") : "Onbekend"}</h4>
            <h2 className="vraagtitel">Vraag {data[0].question}: {this.state.questionText} </h2>
                {data[0].answers.map((value, index) => (
                  <Card className={`answer-card ${this.state.class[index]}`} key={index} style={{fontSize:25, backgroundColor:"rgba(255,255,255,0.7)", backdropFilter:"blur(10px)"}} onClick={() => this.viewCard(index)}>
                    <img src="/img/star.png" className="star" alt="star"></img>
                    <span>{index+1}. </span>
                    <b>{value.player}</b>
                    <p style={{margin:0, fontSize:20}}>{value.comment}</p>
                  </Card>
                ))}
          </div>
        :
          <h2>Selecteer eerst een speler bij een vraag...</h2>
        }
      </div>
    )
  }
};
