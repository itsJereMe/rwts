import React, { Component } from 'react';
import axios from 'axios';

import {List, ListItem} from 'material-ui/List';

export default class Question extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: []	
		};
	};

	componentDidMount() {
        axios.get(`${process.env.REACT_APP_API_URL}/admin/${this.props.question}`)
            .then(res => {
                this.setState({ data: res.data });
            })
            .catch(err => {
                console.error(err);
            });
    }

    showAnswer(question, player, playerId) {
        this.props.onPlayerClick(question, player, playerId);
        // console.log(question + ' - ' + player);
    }

	render() {
        var { data } = this.state;
        if (data.length < 1) {
          data = [
            {
              player: 'Nog niets verstuurd',
              _id: 0
            }
          ]
        }
        var qst = this.props.question;
        return (
            <List>
                {data.map((value, index) => (
                    <ListItem
                        key={'q'+index}
                        primaryText={value.user ? (value.user.length ? value.user[0].name : "Onbekende") : "Onbekend"}
                        leftIcon={<i className="small material-icons right">person</i>}
                        onClick={this.showAnswer.bind(this, qst, value._id, value.playerId)}
                    />
                ))}
            </List>
        )
	}
};
