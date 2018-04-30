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
        axios.get(`http://server:3001/api/admin/${this.props.question}`)
            .then(res => {
                this.setState({ data: res.data });
                //console.log(res.data)
            })
            .catch(err => {
                console.error(err);
            });
    }

    showAnswer(question, player) {
        this.props.onPlayerClick(question, player);
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
                        primaryText={value.player}
                        leftIcon={<i className="small material-icons right">person</i>}
                        onClick={this.showAnswer.bind(this, qst, value._id)}
                    />
                ))}
            </List>
        )
	}
};
