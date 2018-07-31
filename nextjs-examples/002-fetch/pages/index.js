import React from "react";
import Link from "next/link";
import "isomorphic-unfetch";

export default class Index extends React.Component {
  static async getInitialProps() {
    const response = await fetch("http://localhost:3000/users");
    const result = await response.json();

    console.log(result);

    return { users: result };
  }

  render() {
    return (
      <div>
        <h1>users</h1>
        <ul>
          <ul>
            {this.props.users.map((user, index) => (
              <li key={index}>{user.name}</li>
            ))}
          </ul>
        </ul>
      </div>
    );
  }
}
