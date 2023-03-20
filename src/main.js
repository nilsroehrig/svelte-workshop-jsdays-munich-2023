import "@picocss/pico";
import "./app.css";
import App from "./App.svelte";
import { createEstimationStore } from "./lib/stores/estimations";
import { createRouter } from "./lib/stores/router";

const app = new App({
  target: document.getElementById("app"),
  // @ts-ignore
  context: new Map([
    ["router", createRouter()],
    ["estimations", createEstimationStore([])],
  ]),
});

export default app;
