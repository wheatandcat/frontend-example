import { h, app } from "hyperapp";

const host = process.env.HOST || "http://localhost:3000";

const state = {
  input: {
    name: "",
    genderCode: "1"
  },
  users: []
};

const actions = {
  onInput: e => state => {
    const name = e.target.name;
    const value = e.target.value;

    return {
      input: {
        ...state.input,
        [name]: value
      }
    };
  },

  resetInput: () => state => ({
    input: {
      name: "",
      genderCode: "1"
    }
  }),

  save: () => async state => {
    const response = await fetch(`${host}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(state.input)
    });

    if (!response.ok) {
      return alert("登録に失敗しました");
    }

    // 入力をリセット
    main.resetInput();
    // リストを再取得
    main.getUsers();
  },

  remove: id => async () => {
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
    main.getUsers();
  },

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
  <main>
    <h3>hyper-app | 003-form</h3>
    <br />
    <h3>form</h3>
    名前:{" "}
    <input
      type="text"
      placeholder="name"
      name="name"
      oninput={actions.onInput}
    />
    <br />
    性別:{" "}
    <input
      type="radio"
      name="genderCode"
      value={1}
      checked={state.input.genderCode == 1}
      oninput={actions.onInput}
    />
    男性{" "}
    <input
      type="radio"
      name="genderCode"
      value={2}
      checked={state.input.genderCode == 2}
      oninput={actions.onInput}
    />
    女性
    <br />
    <br />
    <div>
      <button onclick={actions.save}>登録</button>
    </div>
    <br />
    <h3>users</h3>
    <table border="1" style={{ width: "30rem" }}>
      <tr>
        <th>id</th>
        <th>名前</th>
        <th>性別</th>
        <th>action</th>
      </tr>

      {state.users.map((user, index) => (
        <tr key={index}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.genderCode == "1" ? "男性" : "女性"}</td>
          <td>
            <button onclick={() => actions.remove(user.id)}>削除</button>
          </td>
        </tr>
      ))}
    </table>
  </main>
);

export const main = app(state, actions, view, document.body);

// 表示の際にfetchする
main.getUsers();
