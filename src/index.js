import dotenv from "dotenv";
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import CreateAccountPage from './pages/createAccount/CreateAccountPage';
import "./global/global.css"
import ProfilePage from "./pages/profile/profilePage";
import { AuthContext, AuthProvider } from "./providers/auth";
import ProfileConvidado from "./pages/profileConvidado/ProfileConvidado";
import notFound from "./pages/notFound/notFound";

dotenv.config();

ReactDOM.render(
  <BrowserRouter>
    <Switch>

      <Redirect from="/" exact={true} to="/login"/>
      <Route path="/create/account" component={CreateAccountPage}/>

      <AuthProvider>
        <Route path="/login" exact={true} component={LoginPage}/>
        <Route path="/profile" exact={true}  component={ProfilePage}/>
        <Route path="/profile/:username" exact={true} component={ProfileConvidado}/>
        <Route path="/err" exact={true} component={notFound}/>
      </AuthProvider>
  
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

