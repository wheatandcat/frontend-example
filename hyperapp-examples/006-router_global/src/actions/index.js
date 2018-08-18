const host = process.env.HOST || "http://localhost:3000";

export default {
  // 入力は全てこれを使う
  // keyNameは、「data-input-name="*****""」で指定
  onInput: e => state => ({
    [e.target.getAttribute("data-input-name")]: {
      input: { ...state.createUser.input, [e.target.name]: e.target.value }
    }
  }),
  resetCreateUserInput: () => () => ({
    createUser: {
      input: {
        name: "",
        genderCode: "1"
      },
      redirectToId: null
    }
  }),
  redirectToCreateUserId: id => state => ({
    createUser: {
      ...state.createUser,
      redirectToId: id
    }
  }),

  /* Users */
  getUsers: () => async (_, actions) => {
    const response = await fetch(`${host}/users`);

    if (!response.ok) {
      return alert("通信エラー");
    }

    const result = await response.json();

    actions.setUsers(result);
  },
  setUsers: users => () => {
    return {
      users: {
        nodes: users
      }
    };
  },

  /* User */
  getUser: id => async (_, actions) => {
    const response = await fetch(`${host}/users/${id}`);

    if (!response.ok) {
      return alert("通信エラー");
    }

    const result = await response.json();

    actions.setUser(result);
  },
  setUser: user => () => {
    return {
      user: {
        data: user
      }
    };
  },
  saveUser: () => async (state, actions) => {
    const response = await fetch(`${host}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(state.createUser.input)
    });

    if (!response.ok) {
      return alert("登録に失敗しました");
    }

    const result = await response.json();

    actions.redirectToCreateUserId(result.id);
  },
  removeUser: id => async (_, actions) => {
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
    actions.getUsers();
  }
};
