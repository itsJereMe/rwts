import React, { Component } from 'react';
import axios from 'axios';

import Menu from './Menu';

import RaisedButton from 'material-ui/RaisedButton';
import { Input } from 'react-materialize';
import Chip from 'material-ui/Chip';

export default class addPlayer extends Component {
  constructor(props){
    super(props);
    this.state = {
      chipData: [],
      tempPlayer: '',
      currentKey: 0
    };
    this.styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    };

  }

  componentWillMount() {
    axios.get('http://server:3001/api/admin/player')
    .then(res => {
      this.setState({
        chipData: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
  }

  componentDidMount() {
    // console.log(this.state.chipData);
  }

  handleRequestDelete = (key) => {
    axios.delete(`http://server:3001/api/admin/player/${key}`)
    .then(res => {
        console.log(res);
        if (res.status === 200) {
          axios.get('http://server:3001/api/admin/player')
          .then(res => {
            this.setState({
              chipData: res.data
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

  };

  handleRequestAdd = (value) => {
    var newPlayer = {player: value};
    axios.post('http://server:3001/api/admin/player', newPlayer)
    .then(res => {
      // console.log(res);
      if (res.status === 200) {
        document.getElementById("player").value = '';
        axios.get('http://server:3001/api/admin/player')
        .then(res => {
          // console.log(res.data);
          this.setState({
            chipData: res.data
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

    // console.log(value);

  }

  renderChip(data) {
    return (
      <Chip
        key={data._id}
        onRequestDelete={() => this.handleRequestDelete(data._id)}
        style={this.styles.chip}
      >
        {data.player}
      </Chip>
    );
  }

  handleChange(e) {
    this.setState({
      tempPlayer: e.target.value
    });
  }

  render() {
    return (
      <div>
        <div className="Answer-header">
          <h1>Voeg een speler toe</h1>
          <Menu />
        </div>
        <div className="answer top-margin">
          <div className="answers full-width">
            <div style={this.styles.wrapper}>
              {this.state.chipData.map(this.renderChip, this)}
            </div>
            <h4>Voeg een speler toe:</h4>
            <br />
            <Input s={12} className="input-field fs16" label="Naam van de speler" id="player" value={this.props.comment} onChange={this.handleChange.bind(this)}/>
            <RaisedButton 
              label="Opslaan"
              primary={true}
              onClick={() => this.handleRequestAdd(this.state.tempPlayer)}
            />
          </div>
        </div>
      </div>
    )
  }
};
