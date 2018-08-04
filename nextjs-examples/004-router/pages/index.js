import React from "react";
import "isomorphic-unfetch";
import Header from "../components/Header";

const getUsers = async () => {
  const response = await fetch("http://localhost:3000/users");
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
    const result = await getUsers();

    this.setState({ users: result.users });
  };

  render() {
    return (
      <div>
        <Header />

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
