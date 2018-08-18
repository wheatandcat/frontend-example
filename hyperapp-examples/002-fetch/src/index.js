import { h, app } from "hyperapp";

const host = process.env.HOST || "http://localhost:3000";

const state = {
  users: []
};

const actions = {
  getUsers: () => async () => {
    const response = await fetch(`${host}/users`);

    if (!response.ok) {
      return alert("通信エラー");
    }

    const result = await response.json();

    main.setUsers(result);
  },
  setUsers: users => () => ({ users })
};

const view = (state, actions) => (
  <main oncreate={actions.getUsers} style={{ padding: "1rem" }}>
    <h3>hyper-app | 002-fetch</h3>
    <br />
    <h3>users</h3>
    <ul>
      {state.users.map((user, index) => (
        <li key={index}>{user.name}</li>
      ))}
    </ul>
  </main>
);

export const main = app(state, actions, view, document.body);

// 表示の際にfetchする
main.getUsers();
