import "./style";
import { Component } from "preact";

export default class App extends Component {
  state = {
    users: []
  };

  async componentDidMount() {
    const response = await fetch("http://localhost:3000/users");
    const result = await response.json();

    this.setState({
      users: result
    });
  }

  render() {
    return (
      <div style={{ padding: "1rem" }}>
        <h1>users</h1>
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
