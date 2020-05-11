// import React dependecies
import React, { Component } from 'react';

// import required tools
import { Input } from 'react-materialize';

// create and export the Input component/handler
export default class CommentInput extends Component {
    // accept and store the props, received from other components
    constructor (props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    // send changes in the input field tot the assigned prop
    handleChange (e) {
        this.props.handleTextChange(e.target.value, this.props.player, this.props.index);
    }

    // render the component
    render () {
        return (
        <Input s={12} className="input-field fs16" label="Licht je keuze toe" value={this.props.comment ? this.props.comment : ""} onChange={this.handleChange}/>
        )
    }
}