// import React dependecies
import React, { Component } from 'react';

// import Materialize items
import { Input, Row, Card, Button } from 'react-materialize';

export default class NewPlayer extends Component {
    state = {
        player: ''
    }
    
    saveName(e) {
        this.setState({
            player: e.target.value,
        });
    }
    
    setPlayer() {
        this.props.player(this.state.player);
    }

    render() {
        return (
            <div className='halfsize'>
                <Card className='small' key={1} actions={[<Button key={1} onClick={this.setPlayer.bind(this)}> Let's play! </Button>]}>
                    <Row>
                        <h4>Wie ben je?</h4>
                        <Input id="playerName" label="Naam" s={12} maxlength="10" onChange={this.saveName.bind(this)}/>
                    </Row>      
                </Card>
            </div>
    )
  }
};
