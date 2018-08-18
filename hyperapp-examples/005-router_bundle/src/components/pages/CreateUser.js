import { h } from "hyperapp";
import { Redirect } from "@hyperapp/router";

const host = process.env.HOST || "http://localhost:3000";

export const state = {
  input: {
    name: "",
    genderCode: "1"
  },
  redirectToId: null
};

export const actions = {
  onInput: e => state => ({
    input: {
      ...state.input,
      [e.target.name]: e.target.value
    }
  }),
  resetInput: () => () => ({
    input: {
      name: "",
      genderCode: "1"
    },
    redirectToId: null
  }),
  redirectToId: id => () => ({
    redirectToId: id
  }),
  save: () => async (state, actions) => {
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

    const result = await response.json();

    actions.redirectToId(result.id);
  }
};

export default () => (state, actions) => {
  if (state.createUser.redirectToId) {
    actions.createUser.resetInput();
    return <Redirect to={`users/${state.createUser.redirectToId}`} />;
  }

  return (
    <main oncreate={actions.createUser.resetInput}>
      名前:{" "}
      <input
        type="text"
        placeholder="name"
        name="name"
        value={state.createUser.input.name}
        oninput={actions.createUser.onInput}
      />
      <br />
      性別:{" "}
      <input
        type="radio"
        name="genderCode"
        value={1}
        checked={state.createUser.input.genderCode == 1}
        oninput={actions.createUser.onInput}
      />
      男性{" "}
      <input
        type="radio"
        name="genderCode"
        value={2}
        checked={state.createUser.input.genderCode == 2}
        oninput={actions.createUser.onInput}
      />
      女性
      <br />
      <br />
      <div>
        <button onclick={actions.createUser.save}>登録</button>
      </div>
    </main>
  );
};
