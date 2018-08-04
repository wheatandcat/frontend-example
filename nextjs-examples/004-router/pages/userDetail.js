import React from "react";
import "isomorphic-unfetch";
import Header from "../components/Header";

const getUser = async id => {
  const response = await fetch(`http://localhost:3000/users/${id}`);
  const result = await response.json();

  return { user: result };
};

export default class Index extends React.Component {
  static async getInitialProps({ query }) {
    return await getUser(query.id);
  }

  state = {
    user: null
  };

  componentDidMount() {
    this.setState({ user: this.props.user });
  }

  render() {
    if (!this.state.user) {
      return null;
    }

    return (
      <div>
        <Header />

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
