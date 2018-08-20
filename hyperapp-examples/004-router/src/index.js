import { h, app } from "hyperapp";
import { Link, Route, location, Switch, Redirect } from "@hyperapp/router";
import actionsBase from "./actions";
import stateBase from "./state";
import Users from "./components/pages/Users";
import User from "./components/pages/User";
import CreateUser from "./components/pages/CreateUser";

const state = {
  ...stateBase,
  location: location.state
};

const actions = {
  ...actionsBase,
  location: location.actions
};

const view = () => (
  <div>
    <h3>hyper-app | 006-router_global</h3>
    <ul>
      <li>
        <Link to="/users">Users</Link>
      </li>
      <li>
        <Link to="/createUser">CreateUser</Link>
      </li>
    </ul>
    <hr />
    <Switch>
      <Route path="/" render={() => <h3>users</h3>} />
      <Route path="/users" render={() => <h3>users</h3>} />
      <Route path="/users/:userId" render={() => <h3>user</h3>} />
      <Route path="/createUser" render={() => <h3>form</h3>} />
      <Route render={() => <Redirect to="/" />} />
    </Switch>

    <Route path="/" render={Users} />
    <Route path="/users" render={Users} />
    <Route path="/users/:userId" render={User} />
    <Route path="/createUser" render={CreateUser} />
  </div>
);

export const main = app(state, actions, view, document.body);

location.subscribe(main.location);