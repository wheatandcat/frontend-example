import { h, app } from "hyperapp";

const state = {
  count: 0
};

const actions = {
  down: () => state => ({ count: state.count - 1 }),
  up: () => state => ({ count: state.count + 1 })
};

const view = (state, actions) => (
  <main style={{ padding: "1rem" }}>
    <h3>hyper-app | 001-simple</h3>
    <br />
    <div>
      <span style={{ paddingLeft: "1rem" }}>{state.count}</span>
      <br />
      <button onclick={actions.down}>-</button>
      <button onclick={actions.up}>+</button>
    </div>
  </main>
);

export const main = app(state, actions, view, document.body);
