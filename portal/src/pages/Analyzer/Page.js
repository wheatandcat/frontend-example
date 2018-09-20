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

const reports = {
  vue: {
    "001-simple": require("../../data/vue-examples/001-simple/report"),
    "002-fetch": require("../../data/vue-examples/002-fetch/report"),
    "003-form": require("../../data/vue-examples/003-form/report"),
    "004-router": require("../../data/vue-examples/004-router/report")
  }
};

//console.log(reports.vue["004-router"].audits["network-requests"].details.items);

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

  return {
    Stylesheet:
      Stylesheets.reduce((previous, current) => previous + current) / 1000,
    Script: Scripts.reduce((previous, current) => previous + current) / 1000,
    Document:
      Documents.reduce((previous, current) => previous + current) / 1000,
    Other: Others.reduce((previous, current) => previous + current) / 1000
  };
};

const data = [
  {
    name: "simple",
    ...analyzer(
      reports.vue["001-simple"].audits["network-requests"].details.items
    )
  },
  {
    name: "fetch",
    ...analyzer(
      reports.vue["002-fetch"].audits["network-requests"].details.items
    )
  },
  {
    name: "form",
    ...analyzer(
      reports.vue["003-form"].audits["network-requests"].details.items
    )
  },
  {
    name: "router",
    ...analyzer(
      reports.vue["004-router"].audits["network-requests"].details.items
    )
  }
];

export default class extends React.Component {
  render() {
    return (
      <div>
        <Paper>
          <BarChart
            width={500}
            height={300}
            data={data}
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
      </div>
    );
  }
}
