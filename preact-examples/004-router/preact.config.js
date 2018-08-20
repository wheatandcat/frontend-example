import asyncPlugin from "preact-cli-plugin-async";
import envVars from "preact-cli-plugin-env-vars";

export default function(config, env, helpers) {
  asyncPlugin(config);
  envVars(config, env, helpers);
}
