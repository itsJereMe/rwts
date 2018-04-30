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
              href='/WJLmvKnc'
              label='Bekijk de antwoorden'
            />
            <RaisedButton
              primary={true}
              href='/WJLmvKnc/add/players'
              label='Voeg spelers toe'
            />
            <RaisedButton
              primary={true}
              href='/WJLmvKnc/add/questions'
              label='Voeg vragen toe'
            />
            <ToolbarSeparator />
            <RaisedButton
              primary={true}
              href='/WJLmvKnc/results'
              label='Uitslag'
            />
          </ToolbarGroup>
        </Toolbar>  
      </div>
    )
  }
};
