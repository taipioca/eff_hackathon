import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import Viz from "./Viz";

class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/viz" component={Viz} />
          <Route path="/" exact component={App} />
        </Switch>
      </Router>
    );
  }
}
export default Routes;
