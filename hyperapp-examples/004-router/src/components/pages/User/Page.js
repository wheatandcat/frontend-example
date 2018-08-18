import { h } from "hyperapp";

export default ({ match }) => (state, actions) => (
  <main
    oncreate={() => {
      actions.user.get(match.params.userId);
    }}
  >
    {state.user.data ? (
      <table border="1" style={{ width: "30rem" }}>
        <tr>
          <th>id</th>
          <th>名前</th>
          <th>性別</th>
        </tr>
        <tr>
          <td>{state.user.data.id}</td>
          <td>{state.user.data.name}</td>
          <td>{state.user.data.genderCode == "1" ? "男性" : "女性"}</td>
        </tr>
      </table>
    ) : null}
  </main>
);
