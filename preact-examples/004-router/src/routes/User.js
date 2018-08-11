import { Component } from "preact";

export default class extends Component {
  state = {
    user: null
  };

  async componentDidMount() {
    const response = await fetch(
      `http://localhost:3000/users/${this.props.userId}`
    );
    if (!response.ok) {
      return alert("削除に失敗しました");
    }

    const result = await response.json();

    this.setState({
      user: result
    });
  }

  render() {
    if (!this.state.user) {
      return null;
    }

    return (
      <div style={{ padding: "56px 20px" }}>
        <h1>user</h1>
        <table border="1" style={{ width: "30rem" }}>
          <thead>
            <tr>
              <th>id</th>
              <th>名前</th>
              <th>性別</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.user.id}</td>
              <td>{this.state.user.name}</td>
              <td>{this.state.user.genderCode == "1" ? "男性" : "女性"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
