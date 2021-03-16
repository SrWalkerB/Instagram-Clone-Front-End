import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import CreateAccountPage from './pages/createAccount/CreateAccountPage';

import "./global/global.css"

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={LoginPage}/>
      <Route path="/create/account" component={CreateAccountPage}/>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

