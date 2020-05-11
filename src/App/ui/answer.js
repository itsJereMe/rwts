// import React dependecies
import React, { Component } from 'react';


// import style
import '../css/style.css';

// import required tools
import { arrayMove } from 'react-sortable-hoc';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

// import Sortable list
import SortableList from './Sortable/List';

import { Input } from 'react-materialize';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

// import Loader
import Loader from './loader';
import Hider from './hider';

// create and export the app itself with the previously created components
class Answer extends Component {
  // set the default states
  state = {
    question: [],
    players: [],
    loading: false,
    playerName: '',
    playerId: '',
    open: false,
    open2: false,
    openDialog: false,
    ButtonDisabled: true,
    savedComment: [],
    questionCount: 0
  };

  componentWillMount() {
    if (this.state.playerName === '') {
      var localPlayer = localStorage.getItem('playerName');
      var localPlayerId = localStorage.getItem('playerId');
      if (typeof localPlayer === 'undefined' || localPlayer === null) {
        this.setState({
          open: true
        });
      } else {
        this.setState({
          playerName: localPlayer,
          playerId: localPlayerId
        });
      }
    }


  }

  lockGame() {
    localStorage.setItem('finished', 'true');
    console.log("local",localStorage.getItem("playerName"));
  }

  resetGame() {
    localStorage.clear();
    this.setState({playerId: '', open:true, open2:false});
    window.location.href = '/q/1';
  }
  
  // test handler for the button
  changeState = () => {
    if (this.props.question < this.state.questionCount) {
      this.setState({
        loading: !this.state.loading
      });
    }
    // console.log(this.state.players);

    //add POST request
    var answer = {
      player: this.state.playerName,
      playerId: this.state.playerId,
      answers: this.state.players,
      question: this.props.question
    }
  console.log("post", this);
  
    if(this.state.savedComment.length>0) {
      axios.put(process.env.REACT_APP_API_URL+"/comments/"+this.state.savedComment[0]._id, answer)
      .then(res => {
          // console.log(res);
          this.afterSave(res);
      })
      .catch(err => {
        alert("Antwoord bewerken is niet gelukt. Pagina wordt ververst."+err);
          console.error(err);
          window.location.reload();
      });
    } else {
      axios.post(this.props.api, answer)
      .then(res => {
          // console.log(res);
          this.afterSave(res);
      })
      .catch(err => {
        alert("Actie is niet gelukt. Pagina wordt ververst.");
          console.error(err);
          window.location.reload();
      });

    }
  }

  afterSave(res) {
    if (res.status === 200) {
      console.log('Antwoorden zijn succesvol verstuurd.');
      if (this.props.question < this.state.questionCount) {
        var nextQuestion = Number(this.props.question) + 1;
        this.props.history.push('/q/' + nextQuestion);
      } else {
        this.lockGame();
        this.setState({ open2: true });
        console.log("Klaar");
      }
    } else {
      alert("Actie is niet gelukt.");
    }
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

    this.fetchData();

    axios.get(process.env.REACT_APP_API_URL+'/admin/question')
    .then(res => {
      this.setState({
        questionCount: res.data.length
      });
    })
    .catch(err => {
      console.log(err);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.open2) {return;}
    
    if (prevState.savedComment !== this.state.savedComment) {
      if(this.state.savedComment.length > 0) {
        this.setState({
          players: this.state.savedComment[0].answers,
          openDialog: true
        });
      }
    }
    if(prevProps.question !== this.props.question) {
      this.fetchData();
    }
    if(prevState.playerId !== this.state.playerId) {
      this.fetchData();
    }

  }

  fetchData() {
    axios.get(process.env.REACT_APP_API_URL+'/admin/star')
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
          loading:false
        });
      }
  
      return axios.get(process.env.REACT_APP_API_URL+'/admin/'+this.props.question+'/'+this.state.playerId);
    })
    .then(res => {
      if(this.state.playerId) {
        this.setState({
          savedComment: res.data
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
  }

  handleClose() {
    var username = document.getElementById("playerName").value;
      
    axios.post(process.env.REACT_APP_API_URL+'/users',{name: username})
    .then(res => {
      var userId = res.data.data._id;
      localStorage.setItem('playerName', username);
      localStorage.setItem('playerId', userId);
      localStorage.setItem('finished', 'false');
      this.setState({
        playerName: username,
        playerId: userId,
        open: false
      });
    })
    .catch(err => {
      console.log(err);
      alert("Aanmelden is niet gelukt. Dit is niet jouw fout.")
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

  handleSnackbarActionClick= () => {
    this.setState({
      openDialog:false
    })
  }

  handleSnackbarRequestClose = () => {
    this.setState({
      openDialog:false
    })
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

    const finishedActions = [
      <FlatButton
        label="Opnieuw invullen"
        primary={false}
        keyboardFocused={true}
        onClick={this.resetGame.bind(this)}
      />,
    ];

    return (
      <div>
        <div className="answer">
          {this.state.loading ? <Loader /> : null}
          {this.state.open || this.state.open2 ? <Hider /> : null}
          Zet in de juiste volgorde:
          <Snackbar open={this.state.openDialog} action={"Sluit"} onActionClick={this.handleSnackbarActionClick} onRequestClose={this.handleSnackbarRequestClose} autoHideDuration={8000} message={"Je hebt deze vraag al gehad. Je kunt 'm nog wel bewerken."}></Snackbar>
          <Dialog
            title={<h3>Bedankt voor het invullen!</h3>}
            contentStyle={{textAlign: "center"}}
            titleStyle={{textAlign: "center"}}
            modal={true}
            open={this.state.open2}
            actions={finishedActions}
          >
            <div className="setCenter">
              <img src="../../img/checkmark.gif" alt=''/>
            </div>
            Bekijk de livestream voor de uitslag.<br/>
            Je kunt deze pagina sluiten.
          </Dialog>
          <SortableList axis="y" lockAxis="y" helperClass="no-dots" hideSortableGhost={true} pressDelay={150} transitionDuration={250} players={this.state.players} onSortEnd={this.onSortEnd} handleTextChange={this.handleTextChange.bind(this)}/>
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

export default withRouter(Answer);