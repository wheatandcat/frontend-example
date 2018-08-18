import { h, app } from "hyperapp";
import { Link, Route, location, Switch, Redirect } from "@hyperapp/router";
import Users, {
  state as usersState,
  actions as usersActions
} from "./components/pages/Users";
import User, {
  state as userState,
  actions as userActions
} from "./components/pages/User";
import CreateUser, {
  state as createUserState,
  actions as createUserActions
} from "./components/pages/CreateUser";

const state = {
  users: usersState,
  user: userState,
  createUser: createUserState,
  location: location.state
};

const actions = {
  users: usersActions,
  user: userActions,
  createUser: createUserActions,
  location: location.actions
};

const view = () => (
  <div>
    <h3>hyper-app | 005-router_bundle</h3>
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
