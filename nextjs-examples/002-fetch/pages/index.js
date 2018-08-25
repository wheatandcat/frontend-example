import React from "react";
import "isomorphic-unfetch";

const host = process.env.HOST || "http://localhost:3000";

export default class Index extends React.Component {
  static async getInitialProps() {
    const response = await fetch(`${host}/users`);
    const result = await response.json();

    return { users: result };
  }

  render() {
    return (
      <div style={{ padding: "1rem" }}>
        <h3>nextjs | 002-fetch</h3>
        <h3>users</h3>
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
