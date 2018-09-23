import "./main.css";
import { Main } from "./Main.elm";

Main.embed(document.getElementById("root"), {
  host: process.env.ELM_APP_API_URL
});
