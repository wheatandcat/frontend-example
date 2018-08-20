import "./main.css";
import { Main } from "./Main.elm";
import registerServiceWorker from "./registerServiceWorker";

Main.embed(document.getElementById("root"), {
  host: process.env.ELM_APP_API_URL
});

registerServiceWorker();
