import React, { Component } from "react";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Top from "./pages/Top";
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
            <img
              src={
                "https://d2l930y2yx77uc.cloudfront.net/production/uploads/images/7500664/rectangle_large_type_2_961dfe37189f582ff83b1c96dbda5ff5.jpg"
              }
              style={{ width: "100%", maxWidth: "64rem", paddingTop: "1rem" }}
            />
            <Top />
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
