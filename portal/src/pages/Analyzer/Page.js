import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";

const jsItems = ["vue", "angular", "nuxt", "next", "hyperapp", "preact", "elm"];

const reports = {
  vue: {
    icon: "vuejs",
    data: {
      "001-simple": require("../../data/vue-examples/001-simple/report"),
      "002-fetch": require("../../data/vue-examples/002-fetch/report"),
      "003-form": require("../../data/vue-examples/003-form/report"),
      "004-router": require("../../data/vue-examples/004-router/report")
    }
  },
  hyperapp: {
    icon: "hyperapp",
    data: {
      "001-simple": require("../../data/hyperapp-examples/001-simple/report"),
      "002-fetch": require("../../data/hyperapp-examples/002-fetch/report"),
      "003-form": require("../../data/hyperapp-examples/003-form/report"),
      "004-router": require("../../data/hyperapp-examples/004-router/report")
    }
  },
  nuxt: {
    icon: "nuxtjs",
    data: {
      "001-simple": require("../../data/nuxtjs-examples/001-simple/report"),
      "002-fetch": require("../../data/nuxtjs-examples/002-fetch/report"),
      "003-form": require("../../data/nuxtjs-examples/003-form/report"),
      "004-router": require("../../data/nuxtjs-examples/004-router/report")
    }
  },
  elm: {
    icon: "elm",
    data: {
      "001-simple": require("../../data/elm-examples/001-simple/report"),
      "002-fetch": require("../../data/elm-examples/002-fetch/report"),
      "003-form": require("../../data/elm-examples/003-form/report"),
      "004-router": require("../../data/elm-examples/004-router/report")
    }
  },
  angular: {
    icon: "angular",
    data: {
      "001-simple": require("../../data/angular-examples/m001-simple/report"),
      "002-fetch": require("../../data/angular-examples/m002-fetch/report"),
      "003-form": require("../../data/angular-examples/m003-form/report"),
      "004-router": require("../../data/angular-examples/m004-router/report")
    }
  },
  next: {
    icon: "nextjs",
    data: {
      "001-simple": require("../../data/nextjs-examples/001-simple/report"),
      "002-fetch": require("../../data/nextjs-examples/002-fetch/report"),
      "003-form": require("../../data/nextjs-examples/003-form/report"),
      "004-router": require("../../data/nextjs-examples/004-router/report")
    }
  },
  preact: {
    icon: "preact",
    data: {
      "001-simple": require("../../data/preact-examples/001-simple/report"),
      "002-fetch": require("../../data/preact-examples/002-fetch/report"),
      "003-form": require("../../data/preact-examples/003-form/report"),
      "004-router": require("../../data/preact-examples/004-router/report")
    }
  }
};

const analyzer = items => {
  const Stylesheets = items
    .filter(item => item.mimeType === "text/css")
    .map(item => item.transferSize);

  const Scripts = items
    .filter(item => item.mimeType === "application/javascript")
    .map(item => item.transferSize);

  const Documents = items
    .filter(item => item.mimeType === "text/html")
    .map(item => item.transferSize);

  /*
  const Others = items
    .filter(item => item.mimeType === "image/x-icon")
    .map(item => item.transferSize);
  */

  const stylesheet =
    Stylesheets.length > 0
      ? Stylesheets.reduce((previous, current) => previous + current)
      : null;
  const script =
    Scripts.length > 0
      ? Scripts.reduce((previous, current) => previous + current)
      : null;
  const document =
    Documents.length > 0
      ? Documents.reduce((previous, current) => previous + current)
      : null;
  /*
  const other =
    Others.length > 0
      ? Others.reduce((previous, current) => previous + current)
      : null;
  */

  return {
    Stylesheet: stylesheet ? stylesheet / 1000 : 0,
    Script: script ? script / 1000 : 0,
    Document: document ? document / 1000 : 0
    //Other: other ? other / 1000 : 0
  };
};

const data = name => {
  return [
    {
      name: "simple",
      ...analyzer(
        reports[name].data["001-simple"].audits["network-requests"].details
          .items
      )
    },
    {
      name: "fetch",
      ...analyzer(
        reports[name].data["002-fetch"].audits["network-requests"].details.items
      )
    },
    {
      name: "form",
      ...analyzer(
        reports[name].data["003-form"].audits["network-requests"].details.items
      )
    },
    {
      name: "router",
      ...analyzer(
        reports[name].data["004-router"].audits["network-requests"].details
          .items
      )
    }
  ];
};

const totalData = name => {
  return jsItems.map(item => ({
    name: item,
    ...analyzer(
      reports[item].data[name].audits["network-requests"].details.items
    )
  }));
};

export default class extends React.Component {
  render() {
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
          {jsItems.map(name => (
            <Paper style={{ margin: "2rem" }} key={name}>
              <h2>{name}</h2>
              <img
                src={require(`../../images/${reports[name].icon}.png`)}
                style={{ width: "10rem", height: "10rem" }}
                alt="demo"
              />
              <BarChart
                width={400}
                height={250}
                data={data(name)}
                margin={{ top: 40, right: 40, left: 40, bottom: 40 }}
                barSize={400}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />

                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Script" stackId="a" fill="#ffd700" />
                <Bar dataKey="Stylesheet" stackId="a" fill="#98fb98" />
                <Bar dataKey="Document" stackId="a" fill="#4169e1" />
              </BarChart>
            </Paper>
          ))}
        </div>

        <br />
        <br />
        <br />
        <Divider />
        <br />
        <br />
        <br />

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
          {["001-simple", "002-fetch", "003-form", "004-router"].map(name => (
            <Paper style={{ margin: "2rem", padding: "2rem" }}>
              <h2>{name}</h2>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <BarChart
                  width={600}
                  height={500}
                  data={totalData(name)}
                  margin={{ top: 40, right: 40, left: 40, bottom: 40 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />

                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Script" stackId="a" fill="#ffd700" />
                  <Bar dataKey="Stylesheet" stackId="a" fill="#98fb98" />
                  <Bar dataKey="Document" stackId="a" fill="#4169e1" />
                </BarChart>
              </div>
            </Paper>
          ))}
        </div>
      </div>
    );
  }
}
