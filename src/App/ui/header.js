import React, { Component } from 'react';
import '../css/style.css';

export default class Header extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <center><img src='../img/logo.png' className="App-logo" alt="logo" /></center>
        </header>
      </div>
    )
  }
};
