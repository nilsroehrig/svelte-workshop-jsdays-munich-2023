import "@picocss/pico";
import "./app.css";
import App from "./App.svelte";
import { createRouter } from "./lib/stores/router";

const app = new App({
  target: document.getElementById("app"),
  context: new Map([["router", createRouter()]]),
});

export default app;
