import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import 'antd/dist/antd.css'
// core components
import Admin from "layouts/Admin.js";

import Login from "./layouts/Login";
import "assets/css/material-dashboard-react.css?v=1.8.0";
import AuthState from "context/Auth/AuthState";

const hist = createBrowserHistory();

const App = () => {
  return (
    <AuthState>
      {" "}
      <Router history={hist}>
        <Switch>
          <Route path="/admin" component={Admin} />
          <Route path="/login" component={Login} />
          <Redirect from="/" to="/admin/dashboard" />
        </Switch>
      </Router>
    </AuthState>
  );
};

export default App;
