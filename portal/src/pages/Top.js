import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Code from "@material-ui/icons/Code";
import IconButton from "@material-ui/core/IconButton";
import demos from "./demos";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    minHeight: 100,
    width: 300
  },
  control: {
    padding: theme.spacing.unit * 2
  }
});

class GuttersGrid extends React.Component {
  state = {
    spacing: "16"
  };

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignContent: "flex-start",
            paddingRight: "5rem",
            paddingLeft: "5rem",
            width: "80%"
          }}
        >
          {demos.map(demo => (
            <Paper
              className={classes.paper}
              key={demo.name}
              style={{ margin: "2rem", padding: "1rem" }}
            >
              <img
                src={require(`./${demo.name}.png`)}
                style={{
                  width: "100px",
                  height: "100px"
                }}
              />
              <List
                subheader={
                  <ListSubheader component="div">{demo.name}</ListSubheader>
                }
              >
                {demo.items.map(item => (
                  <ListItem button>
                    <a
                      href={`${item.demo}?v=2018828`}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <ListItemText primary={`demo ${item.name}`} />
                    </a>
                    <ListItemSecondaryAction>
                      <a
                        href={item.source}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        <IconButton aria-label="Code">
                          <Code />
                        </IconButton>
                      </a>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Paper>
          ))}
        </div>
      </div>
    );
  }
}

GuttersGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GuttersGrid);
