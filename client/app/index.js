import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import App from './components/App/App';

import Home from './components/Home/Home';


render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home}/>
        {/* <Route path="/helloworld" component={HelloWorld}/>
        <Route component={NotFound}/> */}
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));

