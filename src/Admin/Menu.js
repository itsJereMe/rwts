import React, { Component } from 'react';

import {Toolbar, ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';

export default class Menu extends Component {
  render() {
    return (
      <div>
        <Toolbar>
          <ToolbarGroup>
            <RaisedButton
              primary={true}
              href='/beheer'
              label='Antwoorden'
            />
            <RaisedButton
              primary={true}
              href='/beheer/results'
              label='Uitslag'
            />
            <ToolbarSeparator />
            <RaisedButton
              primary={true}
              href='/beheer/add/players'
              label='Sterren'
            />
            <RaisedButton
              primary={true}
              href='/beheer/add/questions'
              label='Vragen'
            />
          </ToolbarGroup>
        </Toolbar>  
      </div>
    )
  }
};
