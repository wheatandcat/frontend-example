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

const jsItems = ["vue", "hyperapp", "nuxt"];

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
      "001-simple": require("../../data/nuxtjs-exapmles/001-simple/report"),
      "002-fetch": require("../../data/nuxtjs-exapmles/002-fetch/report"),
      "003-form": require("../../data/nuxtjs-exapmles/003-form/report"),
      "004-router": require("../../data/nuxtjs-exapmles/004-router/report")
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

  const Others = items
    .filter(item => item.mimeType === "image/x-icon")
    .map(item => item.transferSize);

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
  const other =
    Others.length > 0
      ? Others.reduce((previous, current) => previous + current)
      : null;

  return {
    Stylesheet: stylesheet ? stylesheet / 1000 : 0,
    Script: script ? script / 1000 : 0,
    Document: document ? document / 1000 : 0,
    Other: other ? other / 1000 : 0
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

export default class extends React.Component {
  render() {
    return (
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
              width={500}
              height={300}
              data={data(name)}
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
              <Bar dataKey="Other" stackId="a" fill="#c0c0c0" />
            </BarChart>
          </Paper>
        ))}
      </div>
    );
  }
}
