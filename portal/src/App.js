import React, { Component } from "react";
import styled from "styled-components";
import Top from "./pages/Top";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header>
          <h1 className="App-title">Welcome to frontend examples</h1>
        </Header>
        <p className="App-intro">DEMO</p>
        <Top />
      </div>
    );
  }
}

const Header = styled.div`
  padding: 0.25rem 0.5rem;
  background: palevioletred;
`;

export default App;
