import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Counters from "../containers/counter";
import DbPages from "../containers/databases";
import ReadFile from "../containers/readFile";

class mainRoute extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/database">Database</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/about" component={ReadFile}></Route>
            <Route path="/database" component={DbPages}></Route>
            <Route path="/" component={Counters}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default mainRoute;
