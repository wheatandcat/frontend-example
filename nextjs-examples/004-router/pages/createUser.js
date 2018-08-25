import React from "react";
import "isomorphic-unfetch";
import Router from "next/router";
import Header from "../components/Header";

const host = process.env.HOST || "http://localhost:3000";

export default class extends React.Component {
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

  reset = () => {
    this.setState({
      input: {
        name: "",
        genderCode: 1
      }
    });
  };

  onSave = async () => {
    const response = await fetch(`${host}/users`, {
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

    Router.push(`/userDetail?id=${result.id}`, `/userDetail/${result.id}`);
  };

  render() {
    return (
      <div>
        <Header />
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
