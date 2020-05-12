
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Admin from './Admin/admin';
import addQuestion from './Admin/Questions';
import addPlayer from './Admin/Players';
import Result from './Admin/results';
import PresenterQuestions from './Presenter/questions';
import PresenterAnswers from './Presenter/answers';
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
                <Route path="/beheer/add/questions" component={addQuestion} />
                <Route path="/beheer/add/players" component={addPlayer} />
                <Route path="/beheer/results" component={Result} />
                <Route path="/beheer" component={Admin} />
                <Route path="/view">
                    <div style={{backgroundImage:"url(/img/smallbg.png)", backgroundSize:"cover", backgroundPosition:"50% 50%", width:"100vw", height:"100vh", overflow:"auto", padding:"5px 10%"}}>
                        <Route path="/view/question/:question/player/:player" component={PresenterAnswers} />
                        <Route exact path="/view/question/:question" component={PresenterQuestions} />
                        <Route exact path="/view" component={PresenterQuestions} />
                    </div>
                </Route>
                <Route path="/q/:question" component={App} />
                <Route path="/finished" component={Finish} />
                <Route path="/" component={App} />
            </Switch>
        </Router>
    </MuiThemeProvider>
    , document.getElementById('root'));
registerServiceWorker();
