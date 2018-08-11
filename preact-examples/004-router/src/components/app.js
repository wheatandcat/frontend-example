import { h, Component } from "preact";
import { Router } from "preact-router";
import Header from "./header";
import Users from "../routes/Users";
import User from "../routes/User";
import CreateUser from "../routes/CreateUser";

export default class App extends Component {
  handleRoute = e => {
    this.currentUrl = e.url;
  };

  render() {
    return (
      <div id="app">
        <Header />
        <Router onChange={this.handleRoute}>
          <Users path="/" />
          <User path="/users/:userId" />
          <CreateUser path="/createUser" />
        </Router>
      </div>
    );
  }
}
