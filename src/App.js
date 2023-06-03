import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Register from "./Register";
import Login from "./Login";
import UserList from "./UserList";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/todos" component={UserList} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
