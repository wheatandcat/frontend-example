import { Component } from "preact";
import { Link } from "preact-router/match";

export default class extends Component {
  state = {
    users: []
  };

  async componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    const response = await fetch("http://localhost:3000/users");
    const result = await response.json();

    if (!response.ok) {
      return alert("削除に失敗しました");
    }

    this.setState({
      users: result
    });
  };

  onRemove = async id => {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      return alert("削除に失敗しました");
    }

    // リストを再取得
    this.getUsers();
  };

  render() {
    return (
      <div style={{ padding: "56px 20px" }}>
        <h1>users</h1>
        <table border="1" style={{ width: "30rem" }}>
          <thead>
            <tr>
              <th>id</th>
              <th>名前</th>
              <th>性別</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user, index) => (
              <tr key={index}>
                <td>
                  <Link href={`/users/${user.id}`}>{user.id}</Link>
                </td>
                <td>{user.name}</td>
                <td>{user.genderCode == "1" ? "男性" : "女性"}</td>
                <td>
                  <button onClick={() => this.onRemove(user.id)}>削除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
