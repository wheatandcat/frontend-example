import { h } from "hyperapp";
import { Redirect } from "@hyperapp/router";

export default () => (state, actions) => {
  if (state.createUser.redirectToId) {
    actions.resetCreateUserInput();
    return <Redirect to={`users/${state.createUser.redirectToId}`} />;
  }

  return (
    <main oncreate={actions.resetCreateUserInput}>
      <h1>form</h1>
      名前:{" "}
      <input
        type="text"
        placeholder="name"
        data-input-name="createUser"
        name="name"
        value={state.createUser.input.name}
        oninput={actions.onInput}
      />
      <br />
      性別:{" "}
      <input
        type="radio"
        name="genderCode"
        value={1}
        data-input-name="createUser"
        checked={state.createUser.input.genderCode == 1}
        oninput={actions.onInput}
      />男性{" "}
      <input
        type="radio"
        name="genderCode"
        value={2}
        data-input-name="createUser"
        checked={state.createUser.input.genderCode == 2}
        oninput={actions.onInput}
      />女性
      <br />
      <br />
      <div>
        <button onclick={actions.saveUser}>登録</button>
      </div>
    </main>
  );
};
