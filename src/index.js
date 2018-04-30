
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Admin from './Admin/admin';
import addQuestion from './Admin/Questions';
import addPlayer from './Admin/Players';
import Result from './Admin/results';
import Finish from './Finish';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
global.jQuery = $;

ReactDOM.render(
    <MuiThemeProvider>
        <Router>
            <Switch>
                <Route path="/WJLmvKnc/add/questions" component={addQuestion} />
                <Route path="/WJLmvKnc/add/players" component={addPlayer} />
                <Route path="/WJLmvKnc/results" component={Result} />
                <Route path="/WJLmvKnc" component={Admin} />
                <Route path="/q/:question" component={App} />
                <Route path="/finished" component={Finish} />
                <Route path="/" component={App} />
            </Switch>
        </Router>
    </MuiThemeProvider>
    , document.getElementById('root'));
registerServiceWorker();
