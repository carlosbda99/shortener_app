import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {isAuthenticated} from "./Services/Auth";
import Login from "./Views/Login/Login";
import Signup from "./Views/Signup";
import Error404 from "./Views/Error/404";
import SecureRoute from "./Route/SecureRoute";
import routesConf from "./Route/RoutesConf";
import ForgotPassword from "./Views/ForgotPassword/ForgotPassword";

const Routes = () => {
  const routes = routesConf;

  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          {isAuthenticated() ?
            <Redirect to={"/"}/> : <Login/>}
        </Route>

        <Route exact path="/signup" component={Signup}/>

        <Route exact path="/reset-password" component={ForgotPassword}/>

        {
          routes.map(
            (route, i) =>
              <SecureRoute exact key={i} {...route}/>
          )
        }

        <Route path="*" component={Error404}/>
      </Switch>
    </Router>
  );
};

export default Routes;
