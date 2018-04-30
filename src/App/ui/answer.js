// import React dependecies
import React, { Component } from 'react';

// import style
import '../css/style.css';

// import required tools
import { arrayMove } from 'react-sortable-hoc';
import axios from 'axios';

// import Sortable list
import SortableList from './Sortable/List';

import { Input } from 'react-materialize';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

// import Loader
import Loader from './loader';
import Hider from './hider';

// create and export the app itself with the previously created components
export default class Answer extends Component {
  // set the default states
  state = {
    question: [],
    players: [],
    loading: false,
    playerName: '',
    open: false,
    open2: false,
    ButtonDisabled: true
  };

  componentWillMount() {
    if (this.state.playerName === '') {
      var localPlayer = localStorage.getItem('playerName');
      if (typeof localPlayer === 'undefined' || localPlayer === null) {
        this.setState({
          open: true
        });
      } else {
        this.setState({
          playerName: localPlayer,
        });
      }
    }
    axios.get('http://server:3001/api/admin/player')
    .then(res => {
      var i;
      var iLength = res.data.length;
      for (i = 0; i < iLength; i++) {
        var newPoints;
        newPoints = iLength - i;
        var tempPlayers = res.data;
        tempPlayers[i].points = newPoints;
  
        this.setState({
          players: tempPlayers,
        });
      }
  
    })
    .catch(err => {
      console.log(err);
    });

  }

  resetGame() {
    localStorage.clear();
    localStorage.setItem('finished', 'true');
    this.setState({playerName: ''})
  }
  
  // test handler for the button
  changeState = () => {
    if (this.props.question <= 8) {
      this.setState({
        loading: !this.state.loading
      });
    }
    // console.log(this.state.players);

    //add POST request
    var answer = {
      player: this.state.playerName,
      answers: this.state.players,
      question: this.props.question
    }
    axios.post(this.props.url, answer)
    .then(res => {
        // console.log(res);
        if (res.status === 200) {
          console.log('Antwoorden zijn succesvol verstuurd.');
          if (this.props.question <= 8) {
            var nextQuestion = Number(this.props.question) + 1;
            window.location.replace('http://server:3000/q/' + nextQuestion)
          } else {
            this.setState({ open2: true });
            this.resetGame.bind(this);
          }
        }
    })
    .catch(err => {
        console.error(err);
    });

  }

  // update the position state of the players after changing the order
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      players: arrayMove(this.state.players, oldIndex, newIndex),
    });
    var i;
    var iLength = this.state.players.length
    for (i = 0; i < iLength; i++) {
      var newPoints;
      newPoints = iLength - i;
      var tempPlayers = this.state.players;
      tempPlayers[i].points = newPoints;

      this.setState({
        tempPlayers,
      });
    }
    return true;
  };

  // handles events on a new mount from the component
  componentDidMount() {
    var i;
    var iLength = this.state.players.length
    for (i = 0; i < iLength; i++) {
      var newPoints;
      newPoints = iLength - i;
      var tempPlayers = this.state.players;
      tempPlayers[i].points = newPoints;

      this.setState({
        tempPlayers,
      });
    }
    if (localStorage.getItem('finished') === 'true') {
      this.setState({
        open: false,
        open2: true
      })
    }

  }

  handleClose() {
    var username = document.getElementById("playerName").value;
    localStorage.setItem('playerName', username);
    localStorage.setItem('finished', 'false');
    this.setState({
      playerName: username,
      open: false
    });
  }

  checkName(e) {
    if (e.target.value.length >= 3) {
      this.setState({
        ButtonDisabled: false
      });
    } else {
      this.setState({
        ButtonDisabled: true
      });
    }
  }

  // when a textchange in a player's input field happends, update the comment field of the updated player
  handleTextChange(e, name, index) {
    const players = this.state.players;
    players[index].comment = e;

    this.setState({
      players,
    });
  }
  
  // render the answer page
  render() {
    const actions = [
      <RaisedButton
        label="Submit"
        primary={true}
        disabled={this.state.ButtonDisabled}
        onClick={this.handleClose.bind(this)}
      />,
    ];

    return (
      <div>
        <div className="answer">
          {this.state.loading ? <Loader /> : null}
          {this.state.open || this.state.open2 ? <Hider /> : null}
          Zet in de juiste volgorde:
          <Dialog
            title={<h3>Bedankt voor het invullen</h3>}
            contentStyle={{textAlign: "center"}}
            titleStyle={{textAlign: "center"}}
            modal={true}
            open={this.state.open2}
          >
            <div className="setCenter">
              <img src="../../img/checkmark.gif" alt=''/>
            </div>
          </Dialog>
          <SortableList axis="y" lockAxis="y" helperClass="no-dots" hideSortableGhost={true} pressDelay={200} transitionDuration={450} players={this.state.players} onSortEnd={this.onSortEnd} handleTextChange={this.handleTextChange.bind(this)}/>
          <Dialog
            title="Wie ben je?"
            actions={actions}
            modal={true}
            open={this.state.open}
          ><Input id="playerName" label="Naam" s={12} maxLength="15" onChange={this.checkName.bind(this)}/>
          </Dialog>
        </div>
        <footer className="page-footer footer-fixed">
            {this.state.loading 
            ?
            <div>
              <button className="waves-effect waves-light btn-large grey darken-1" onClick={this.changeState}>
                <span className="right-mrg">Antwoorden worden verstuurd...</span>
              </button>
            </div>
            : 
            <div>
              <button className="waves-effect waves-light btn-large green accent-4" onClick={this.changeState}>
                <i className="large material-icons right">check</i>
                <span className="large">Antwoorden versturen</span>
              </button>
            </div>
            }
        </footer>
      </div>
    )
  }
};
