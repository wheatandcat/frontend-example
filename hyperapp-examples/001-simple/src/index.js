import { h, app } from "hyperapp";

const state = {};

const actions = {};

const view = () => (
  <main style={{ padding: "1rem" }}>
    <h3>hyper-app | 001-simple</h3>
    <br />
    <div>welcome</div>
  </main>
);

export const main = app(state, actions, view, document.body);
