import React, { Component } from "react";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Router } from "@reach/router";
import Top from "./pages/Top/Page";
import Analyzer from "./pages/Analyzer/Page";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div style={{ background: "#D1B58E" }}>
        <AppBar
          position="static"
          style={{ background: "palevioletred", padding: "0.5rem 2rem" }}
        >
          <Toolbar>
            <Typography
              variant="display1"
              color="inherit"
              style={{ flexGrow: 1 }}
            >
              フロントエンド技術ポータル
            </Typography>
            <Button
              href="https://github.com/wheatandcat/frontend-example"
              target="_blank"
              rel="noreferrer noopener"
            >
              github
            </Button>
          </Toolbar>
        </AppBar>
        <Root>
          <Content>
            <Router>
              <Top path="/" />
              <Analyzer path="analyzer" />
            </Router>
          </Content>
        </Root>
      </div>
    );
  }
}

const Root = styled.div`
  max-width: "820px";
`;

const Content = styled.div`
  text-align: center;
`;

export default App;
