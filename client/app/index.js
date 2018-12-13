import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import App from './components/App/App';

import Home from './components/Home/Home';
import SignUp from './components/SignUp/SignUp';
import Entry from './components/Entry/Entry';

import './styles/styles.scss';

render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/SignUp" component={SignUp}/>
        <Route path="/Entry" component={Entry}/>

        {/* <Route component={NotFound}/> */}
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));

  