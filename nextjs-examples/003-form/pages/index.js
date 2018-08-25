import React from "react";
import "isomorphic-unfetch";

const host = process.env.HOST || "http://localhost:3000";

const getUsers = async () => {
  const response = await fetch(`${host}/users`);
  const result = await response.json();

  return { users: result };
};

export default class Index extends React.Component {
  static async getInitialProps() {
    return await getUsers();
  }

  state = {
    input: {
      name: "",
      genderCode: 1
    },
    users: []
  };

  componentDidMount() {
    this.setState({ users: this.props.users });
  }

  onInput = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      input: {
        ...this.state.input,
        [name]: value
      }
    });
  };

  reset = () => {
    this.setState({
      input: {
        name: "",
        genderCode: 1
      }
    });
  };

  onSave = async () => {
    const response = await fetch(`${host}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.input)
    });

    if (!response.ok) {
      return alert("登録に失敗しました");
    }

    // 入力をリセット
    this.reset();
    // リストを再取得
    const result = await getUsers();

    this.setState({ users: result.users });
  };

  onRemove = async id => {
    const response = await fetch(`${host}/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      return alert("削除に失敗しました");
    }

    // リストを再取得
    const result = await getUsers();

    this.setState({ users: result.users });
  };

  render() {
    return (
      <div style={{ padding: "1rem" }}>
        <h3>nextjs | 003-form</h3>
        <h3>form</h3>
        名前:{" "}
        <input
          type="text"
          placeholder="name"
          name="name"
          value={this.state.input.name}
          onChange={this.onInput}
        />
        <br />
        性別:{" "}
        <input
          type="radio"
          name="genderCode"
          value={1}
          checked={this.state.input.genderCode == 1}
          onChange={this.onInput}
        />
        男性{" "}
        <input
          type="radio"
          name="genderCode"
          value={2}
          checked={this.state.input.genderCode == 2}
          onChange={this.onInput}
        />
        女性
        <br />
        <br />
        <div>
          <button onClick={this.onSave}>登録</button>
        </div>
        <h3>users</h3>
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
                <td>{user.id}</td>
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
