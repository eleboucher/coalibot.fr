import React, { Component } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import axios from "./config/axios";
import Leaderboard from "./pages/Leaderboard";
import "./App.css";

class App extends Component {
  state = {
    connected: false
  };

  componentDidMount() {
    axios
      .get("/logged")
      .then(({ data }) => {
        if (data.logged) {
          this.setState({ connected: true });
        }
      })
      .catch(console.log);
  }
  render() {
    const { connected } = this.state;
    return (
      <div className="App">
        {connected ? (
          <BrowserRouter>
            <Switch>
              {/* <Route exact path="/" component={Home} /> */}
              <Route exact path="/" component={Leaderboard} />
            </Switch>
          </BrowserRouter>
        ) : (
          <Login />
        )}
      </div>
    );
  }
}

export default App;
