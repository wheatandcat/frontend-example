import "./style";
import { h, Component } from "preact";

const host = process.env.PREACT_APP_HOST || "http://localhost:3000";

export default class App extends Component {
  state = {
    users: []
  };

  async componentDidMount() {
    const response = await fetch(`${host}/users`);
    const result = await response.json();

    this.setState({
      users: result
    });
  }

  render() {
    return (
      <div style={{ padding: "1rem" }}>
        <h3>preact | 002-fetch</h3>
        <br />
        <h3>users</h3>
        <ul>
          <ul>
            {this.state.users.map((user, index) => (
              <li key={index}>{user.name}</li>
            ))}
          </ul>
        </ul>
      </div>
    );
  }
}
