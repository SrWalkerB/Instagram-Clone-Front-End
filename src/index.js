import dotenv from "dotenv";
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import CreateAccountPage from './pages/createAccount/CreateAccountPage';
import "./global/global.css"
import ProfilePage from "./pages/profile/profilePage";
dotenv.config();


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Redirect from="/" exact={true} to="/login"/>
      <Route path="/login" exact={true} component={LoginPage}/>
      <Route path="/create/account" component={CreateAccountPage}/>
      <Route path="/profile" component={ProfilePage}/>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

