import { Component } from "preact";
import { route } from "preact-router";

export default class extends Component {
  state = {
    input: {
      name: "",
      genderCode: 1
    }
  };

  onInput = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      input: {
        ...this.state.input,
        [name]: value
      }
    });
  };

  onSave = async () => {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.input)
    });

    if (!response.ok) {
      return alert("登録に失敗しました");
    }

    const result = await response.json();

    route(`users/${result.id}`, true);
  };

  render() {
    return (
      <div style={{ padding: "56px 20px" }}>
        <h1>form</h1>
        名前:{" "}
        <input
          type="text"
          placeholder="name"
          name="name"
          value={this.state.input.name}
          onChange={this.onInput}
        />
        <br />
        性別:{" "}
        <input
          type="radio"
          name="genderCode"
          value={1}
          checked={this.state.input.genderCode == 1}
          onChange={this.onInput}
        />
        男性{" "}
        <input
          type="radio"
          name="genderCode"
          value={2}
          checked={this.state.input.genderCode == 2}
          onChange={this.onInput}
        />
        女性
        <br />
        <br />
        <div>
          <button onClick={this.onSave}>登録</button>
        </div>
      </div>
    );
  }
}
